export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  equipment: string[];
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  instructions: string[];
  image: string;
  duration: number;
  sets: number;
  reps: number;
  restTime: number;
  video: string;
}