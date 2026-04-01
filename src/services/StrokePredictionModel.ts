import * as tf from '@tensorflow/tfjs';
import { DataCleaningService, CleanedData } from './DataCleaningService';
import * as fs from 'fs';
import * as path from 'path';

interface TrainingResult {
  model: tf.Sequential;
  history: tf.History;
  accuracy: number;
  testAccuracy: number;
}

export class StrokePredictionModel {
  private model: tf.Sequential | null = null;
  private dataCleaningService: DataCleaningService;
  private readonly modelPath: string;

  constructor() {
    this.dataCleaningService = DataCleaningService.getInstance();
    this.modelPath = path.join(__dirname, '../../models/stroke-model.json');
  }

  public async trainModel(datasetPath?: string): Promise<TrainingResult> {
    console.log('\n🤖 Starting model training...\n');

    // Load and clean data
    const cleanedData = await this.dataCleaningService.loadAndCleanDataset(datasetPath);
    const { train, test } = this.dataCleaningService.splitDataset(0.2);

    console.log(`\n📚 Training samples: ${train.length}`);
    console.log(`🧪 Test samples: ${test.length}`);

    // Prepare tensors
    const trainFeatures = tf.tensor2d(train.map(d => d.features));
    const trainLabels = tf.tensor2d(train.map(d => [d.label]));
    const testFeatures = tf.tensor2d(test.map(d => d.features));
    const testLabels = tf.tensor2d(test.map(d => [d.label]));

    // Build model
    this.model = this.buildModel();

    // Train
    const history = await this.model.fit(trainFeatures, trainLabels, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch: number, logs?: tf.Logs) => {
          if (epoch % 10 === 0) {
            console.log(`   Epoch ${epoch}: loss=${logs?.loss.toFixed(4)}, val_loss=${logs?.val_loss.toFixed(4)}`);
          }
        }
      }
    });

    // Evaluate
    const evaluation = this.model.evaluate(testFeatures, testLabels) as tf.Tensor[];
    const testAccuracy = (await evaluation[1].data())[0];

    // Calculate training accuracy
    const predictions = this.model.predict(trainFeatures) as tf.Tensor;
    const predArray = await predictions.data();
    const trainAccuracy = this.calculateAccuracy(predArray, train.map(d => d.label));

    console.log(`\n✅ Model training complete!`);
    console.log(`   Training accuracy: ${(trainAccuracy * 100).toFixed(1)}%`);
    console.log(`   Test accuracy: ${(testAccuracy * 100).toFixed(1)}%`);

    // Save model
    await this.saveModel();

    // Cleanup tensors
    trainFeatures.dispose();
    trainLabels.dispose();
    testFeatures.dispose();
    testLabels.dispose();
    predictions.dispose();
    evaluation.forEach(t => t.dispose());

    return {
      model: this.model,
      history,
      accuracy: trainAccuracy,
      testAccuracy
    };
  }

  private buildModel(): tf.Sequential {
    const model = tf.sequential();

    model.add(tf.layers.dense({
      inputShape: [10],
      units: 64,
      activation: 'relu',
      kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
    }));

    model.add(tf.layers.dropout({ rate: 0.3 }));

    model.add(tf.layers.dense({
      units: 32,
      activation: 'relu',
      kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
    }));

    model.add(tf.layers.dropout({ rate: 0.2 }));

    model.add(tf.layers.dense({
      units: 16,
      activation: 'relu'
    }));

    model.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid'
    }));

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    });

    return model;
  }

  private calculateAccuracy(predictions: Float32Array, labels: number[]): number {
    let correct = 0;
    for (let i = 0; i < predictions.length; i++) {
      const predicted = predictions[i] > 0.5 ? 1 : 0;
      if (predicted === labels[i]) correct++;
    }
    return correct / predictions.length;
  }

  private async saveModel(): Promise<void> {
    if (!this.model) return;

    const modelsDir = path.dirname(this.modelPath);
    if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir, { recursive: true });
    }

    await this.model.save(`file://${modelsDir}/stroke-model`);
    console.log(`\n💾 Model saved to: ${modelsDir}`);
  }

  public async loadModel(): Promise<boolean> {
    try {
      const modelsDir = path.dirname(this.modelPath);
      const modelFile = path.join(modelsDir, 'stroke-model/model.json');

      if (!fs.existsSync(modelFile)) {
        console.log('⚠️ No saved model found. Please train first.');
        return false;
      }

      this.model = await tf.loadLayersModel(`file://${modelsDir}/stroke-model/model.json`) as tf.Sequential;
      console.log('✅ Model loaded successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to load model:', error);
      return false;
    }
  }

  public async predict(features: number[]): Promise<{ risk: number; prediction: number }> {
    if (!this.model) {
      throw new Error('Model not trained or loaded');
    }

    const input = tf.tensor2d([features]);
    const prediction = this.model.predict(input) as tf.Tensor;
    const riskValue = (await prediction.data())[0];

    input.dispose();
    prediction.dispose();

    return {
      risk: riskValue,
      prediction: riskValue > 0.5 ? 1 : 0
    };
  }

  public getModelStatus(): { trained: boolean; modelExists: boolean } {
    const modelsDir = path.dirname(this.modelPath);
    const modelFile = path.join(modelsDir, 'stroke-model/model.json');
    return {
      trained: this.model !== null,
      modelExists: fs.existsSync(modelFile)
    };
  }
}
