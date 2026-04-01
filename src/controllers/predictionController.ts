import { Request, Response } from 'express';
import { StrokePredictionModel } from '../services/StrokePredictionModel';
import { DataCleaningService } from '../services/DataCleaningService';
import StrokeRisk from '../models/StrokeRisk';

interface PredictionInput {
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  hypertension: boolean;
  heart_disease: boolean;
  ever_married: boolean;
  work_type: 'Private' | 'Self-employed' | 'Govt_job' | 'children' | 'Never_worked';
  residence_type: 'Urban' | 'Rural';
  avg_glucose_level: number;
  bmi: number;
  smoking_status: 'never' | 'formerly' | 'current' | 'unknown';
  userId?: string;
}

interface PredictionResult {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  probability: number;
  criticalFactors: string[];
  recommendations: string[];
  timestamp: Date;
}

export class PredictionController {
  private model: StrokePredictionModel;
  private dataCleaningService: DataCleaningService;

  constructor() {
    this.model = new StrokePredictionModel();
    this.dataCleaningService = DataCleaningService.getInstance();
  }

  public trainModel = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('\n🚀 Starting model training request...');

      const result = await this.model.trainModel();

      res.status(200).json({
        success: true,
        message: 'Model trained successfully',
        accuracy: {
          training: (result.accuracy * 100).toFixed(1) + '%',
          test: (result.testAccuracy * 100).toFixed(1) + '%'
        },
        epochs: result.history.params.epochs
      });
    } catch (error: any) {
      console.error('❌ Training error:', error);
      res.status(500).json({
        success: false,
        message: 'Model training failed',
        error: error.message
      });
    }
  };

  public predict = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: PredictionInput = req.body;

      // Validate input
      const validation = this.validateInput(input);
      if (!validation.valid) {
        res.status(400).json({
          success: false,
          message: 'Invalid input data',
          errors: validation.errors
        });
        return;
      }

      // Check if model is loaded/trained
      const status = this.model.getModelStatus();
      if (!status.trained && status.modelExists) {
        await this.model.loadModel();
      } else if (!status.trained) {
        res.status(400).json({
          success: false,
          message: 'Model not trained. Please train the model first.'
        });
        return;
      }

      // Convert input to features
      const features = this.convertInputToFeatures(input);

      // Make prediction
      const prediction = await this.model.predict(features);

      // Calculate risk score (0-15 scale to match the existing model)
      const riskScore = Math.min(15, Math.round(prediction.risk * 15));

      // Determine risk level
      const riskLevel = this.calculateRiskLevel(prediction.risk);

      // Identify critical factors and recommendations
      const criticalFactors = this.identifyCriticalFactors(input, prediction.risk);
      const recommendations = this.generateRecommendations(input, riskLevel, criticalFactors);

      const result: PredictionResult = {
        riskScore,
        riskLevel,
        probability: prediction.risk,
        criticalFactors,
        recommendations,
        timestamp: new Date()
      };

      // Save to MongoDB if userId is provided
      if (input.userId) {
        await this.savePrediction(input.userId, input, result);
      }

      res.status(200).json({
        success: true,
        prediction: result
      });

    } catch (error: any) {
      console.error('❌ Prediction error:', error);
      res.status(500).json({
        success: false,
        message: 'Prediction failed',
        error: error.message
      });
    }
  };

  public getModelStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const status = this.model.getModelStatus();

      res.status(200).json({
        success: true,
        status: {
          trained: status.trained,
          modelExists: status.modelExists,
          ready: status.trained || status.modelExists
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to get model status',
        error: error.message
      });
    }
  };

  public getPredictionHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
        return;
      }

      const history = await StrokeRisk.find({ userId })
        .sort({ assessmentDate: -1 })
        .limit(50);

      res.status(200).json({
        success: true,
        count: history.length,
        history
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch prediction history',
        error: error.message
      });
    }
  };

  private validateInput(input: PredictionInput): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (input.age === undefined || input.age < 30 || input.age > 120) {
      errors.push('Age must be between 30 and 120');
    }

    if (input.avg_glucose_level === undefined || input.avg_glucose_level < 50 || input.avg_glucose_level > 300) {
      errors.push('Average glucose level must be between 50 and 300');
    }

    if (input.bmi === undefined || input.bmi < 10 || input.bmi > 50) {
      errors.push('BMI must be between 10 and 50');
    }

    return { valid: errors.length === 0, errors };
  }

  private convertInputToFeatures(input: PredictionInput): number[] {
    const genderEncoded = input.gender === 'Male' ? 1 : input.gender === 'Female' ? 0 : 0.5;
    const marriedEncoded = input.ever_married ? 1 : 0;
    const residenceEncoded = input.residence_type === 'Urban' ? 1 : 0;
    const smokingMap: { [key: string]: number } = {
      'never': 0,
      'formerly': 0.5,
      'current': 1,
      'unknown': 0.3
    };
    const smokingEncoded = smokingMap[input.smoking_status] ?? 0.3;
    const workMap: { [key: string]: number } = {
      'Private': 0,
      'Self-employed': 0.25,
      'Govt_job': 0.5,
      'children': 0.75,
      'Never_worked': 1
    };
    const workTypeEncoded = workMap[input.work_type] ?? 0;

    return [
      (input.age - 30) / (100 - 30),
      genderEncoded,
      input.hypertension ? 1 : 0,
      input.heart_disease ? 1 : 0,
      marriedEncoded,
      workTypeEncoded,
      residenceEncoded,
      (input.avg_glucose_level - 50) / (300 - 50),
      (input.bmi - 10) / (50 - 10),
      smokingEncoded
    ];
  }

  private calculateRiskLevel(probability: number): 'low' | 'medium' | 'high' {
    if (probability < 0.33) return 'low';
    if (probability < 0.66) return 'medium';
    return 'high';
  }

  private identifyCriticalFactors(input: PredictionInput, risk: number): string[] {
    const factors: string[] = [];

    if (input.age > 65) factors.push('Advanced age');
    if (input.hypertension) factors.push('Hypertension');
    if (input.heart_disease) factors.push('Heart disease');
    if (input.avg_glucose_level > 140) factors.push('High glucose level');
    if (input.bmi > 30) factors.push('Obesity (BMI > 30)');
    if (input.smoking_status === 'current') factors.push('Active smoking');
    if (input.smoking_status === 'formerly') factors.push('Former smoker');

    return factors;
  }

  private generateRecommendations(input: PredictionInput, riskLevel: string, factors: string[]): string[] {
    const recommendations: string[] = [];

    if (riskLevel === 'high') {
      recommendations.push('Consult a neurologist immediately');
      recommendations.push('Monitor blood pressure daily');
      recommendations.push('Consider medication for stroke prevention');
    } else if (riskLevel === 'medium') {
      recommendations.push('Schedule regular health check-ups');
      recommendations.push('Monitor blood pressure weekly');
    } else {
      recommendations.push('Maintain healthy lifestyle');
    }

    if (input.hypertension) {
      recommendations.push('Take prescribed hypertension medication');
      recommendations.push('Reduce sodium intake');
    }

    if (input.bmi > 25) {
      recommendations.push('Aim for weight reduction through diet and exercise');
      recommendations.push('Target BMI: 18.5-24.9');
    }

    if (input.smoking_status === 'current') {
      recommendations.push('Seek smoking cessation support');
    }

    if (input.avg_glucose_level > 100) {
      recommendations.push('Monitor blood glucose levels');
      recommendations.push('Consider diabetes screening');
    }

    recommendations.push('Exercise at least 150 minutes per week');
    recommendations.push('Maintain a balanced diet rich in fruits and vegetables');

    return recommendations;
  }

  private async savePrediction(userId: string, input: PredictionInput, result: PredictionResult): Promise<void> {
    try {
      const strokeRisk = new StrokeRisk({
        userId: userId,
        age: input.age,
        systolicBP: input.hypertension ? 140 : 120, // Estimate based on hypertension
        diastolicBP: input.hypertension ? 90 : 80,
        bmi: input.bmi,
        smokingStatus: input.smoking_status as 'never' | 'former' | 'current',
        diabetesStatus: input.avg_glucose_level > 126 ? 'yes' : 'no',
        physicalActivity: 'moderate', // Default
        familyHistory: input.heart_disease ? 'yes' : 'no',
        riskScore: result.riskScore,
        riskLevel: result.riskLevel,
        criticalFactors: result.criticalFactors,
        recommendations: result.recommendations,
        assessmentDate: new Date(),
        nextAssessmentDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000), // 6 months
        trend: 'stable'
      });

      await strokeRisk.save();
      console.log(`✅ Prediction saved to MongoDB for user: ${userId}`);
    } catch (error) {
      console.error('❌ Failed to save prediction:', error);
    }
  }
}

export default PredictionController;
