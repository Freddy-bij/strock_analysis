import * as tf from '@tensorflow/tfjs';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';

interface StrokeData {
  id: number;
  gender: string;
  age: number;
  hypertension: number;
  heart_disease: number;
  ever_married: string;
  work_type: string;
  Residence_type: string;
  avg_glucose_level: number;
  bmi: string | number;
  smoking_status: string;
  stroke: number;
}

export interface CleanedData {
  features: number[];
  label: number;
}

export class DataCleaningService {
  private static instance: DataCleaningService;
  private dataset: StrokeData[] = [];
  private cleanedData: CleanedData[] = [];

  private constructor() {}

  public static getInstance(): DataCleaningService {
    if (!DataCleaningService.instance) {
      DataCleaningService.instance = new DataCleaningService();
    }
    return DataCleaningService.instance;
  }

  public async loadAndCleanDataset(datasetPath?: string): Promise<CleanedData[]> {
    const filePath = datasetPath || path.join(__dirname, '../strokeRiskDataSet.csv');
    
    console.log('📊 Loading dataset from:', filePath);
    
    this.dataset = await this.readCSV(filePath);
    console.log(`✅ Loaded ${this.dataset.length} records`);

    this.cleanedData = this.cleanData(this.dataset);
    console.log(`✅ Cleaned ${this.cleanedData.length} records`);

    this.printDatasetStatistics();

    return this.cleanedData;
  }

  private readCSV(filePath: string): Promise<StrokeData[]> {
    return new Promise((resolve, reject) => {
      const results: StrokeData[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: any) => {
          results.push({
            id: parseInt(data.id),
            gender: data.gender,
            age: parseFloat(data.age),
            hypertension: parseInt(data.hypertension),
            heart_disease: parseInt(data.heart_disease),
            ever_married: data.ever_married,
            work_type: data.work_type,
            Residence_type: data.Residence_type,
            avg_glucose_level: parseFloat(data.avg_glucose_level),
            bmi: data.bmi === 'N/A' ? null : parseFloat(data.bmi),
            smoking_status: data.smoking_status,
            stroke: parseInt(data.stroke)
          });
        })
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  private cleanData(data: StrokeData[]): CleanedData[] {
    const cleaned: CleanedData[] = [];

    // Calculate average BMI for imputation
    const validBmis = data
      .map(d => d.bmi)
      .filter(bmi => bmi !== null && !isNaN(bmi as number)) as number[];
    const avgBmi = validBmis.reduce((sum, bmi) => sum + bmi, 0) / validBmis.length;

    for (const record of data) {
      // Skip records with missing critical values
      if (isNaN(record.age) || isNaN(record.avg_glucose_level)) {
        continue;
      }

      // Impute missing BMI
      const bmi = record.bmi === null || isNaN(record.bmi as number) 
        ? avgBmi 
        : record.bmi as number;

      // Encode categorical variables
      const genderEncoded = this.encodeGender(record.gender);
      const marriedEncoded = record.ever_married === 'Yes' ? 1 : 0;
      const residenceEncoded = record.Residence_type === 'Urban' ? 1 : 0;
      const smokingEncoded = this.encodeSmoking(record.smoking_status);
      const workTypeEncoded = this.encodeWorkType(record.work_type);

      const features = [
        this.normalizeAge(record.age),
        genderEncoded,
        record.hypertension,
        record.heart_disease,
        marriedEncoded,
        workTypeEncoded,
        residenceEncoded,
        this.normalizeGlucose(record.avg_glucose_level),
        this.normalizeBmi(bmi),
        smokingEncoded
      ];

      cleaned.push({
        features,
        label: record.stroke
      });
    }

    return cleaned;
  }

  private encodeGender(gender: string): number {
    const map: { [key: string]: number } = {
      'Male': 1,
      'Female': 0,
      'Other': 0.5
    };
    return map[gender] ?? 0.5;
  }

  private encodeSmoking(status: string): number {
    const map: { [key: string]: number } = {
      'never smoked': 0,
      'formerly smoked': 0.5,
      'smokes': 1,
      'Unknown': 0.3
    };
    return map[status] ?? 0.3;
  }

  private encodeWorkType(workType: string): number {
    const map: { [key: string]: number } = {
      'Private': 0,
      'Self-employed': 0.25,
      'Govt_job': 0.5,
      'children': 0.75,
      'Never_worked': 1
    };
    return map[workType] ?? 0;
  }

  private normalizeAge(age: number): number {
    return (age - 30) / (100 - 30); // Normalize between 30-100
  }

  private normalizeGlucose(glucose: number): number {
    return (glucose - 50) / (300 - 50); // Normalize typical glucose range
  }

  private normalizeBmi(bmi: number): number {
    return (bmi - 10) / (50 - 10); // Normalize BMI range
  }

  private printDatasetStatistics(): void {
    const total = this.cleanedData.length;
    const strokes = this.cleanedData.filter(d => d.label === 1).length;
    const noStrokes = this.cleanedData.filter(d => d.label === 0).length;

    console.log('\n📈 Dataset Statistics:');
    console.log(`   Total samples: ${total}`);
    console.log(`   Stroke cases: ${strokes} (${((strokes/total)*100).toFixed(1)}%)`);
    console.log(`   No stroke: ${noStrokes} (${((noStrokes/total)*100).toFixed(1)}%)`);
  }

  public splitDataset(testRatio: number = 0.2): { train: CleanedData[]; test: CleanedData[] } {
    const shuffled = [...this.cleanedData].sort(() => Math.random() - 0.5);
    const splitIndex = Math.floor(shuffled.length * (1 - testRatio));
    
    return {
      train: shuffled.slice(0, splitIndex),
      test: shuffled.slice(splitIndex)
    };
  }
}
