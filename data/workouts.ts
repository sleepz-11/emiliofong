export interface Workout {
  id: string;
  title: string;
  description: string;
  duration: number;
  exercises: string[];
  image: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  category: 'Fuerza' | 'Cardio' | 'Flexibilidad' | 'HIIT';
}

export const workouts = [
  {
    id: '1',
    title: 'Fuerza Corporal Total',
    description: 'Un entrenamiento completo que trabaja todos los grupos musculares principales para desarrollar fuerza y tonificar.',
    duration: 45,
    exercises: ['1', '2', '3', '4'],
    image: 'https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    level: 'Intermedio',
    category: 'Fuerza'
  },
  {
    id: '2',
    title: 'HIIT Cardio Intenso',
    description: 'Entrenamiento por intervalos de alta intensidad para maximizar la quema de calorías y mejorar la salud cardiovascular.',
    duration: 30,
    exercises: ['4', '2', '1'],
    image: 'https://images.pexels.com/photos/4803530/pexels-photo-4803530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    level: 'Avanzado',
    category: 'HIIT'
  },
  {
    id: '3',
    title: 'Abdominales Intensos',
    description: 'Enfoque en ejercicios abdominales y de espalda baja para construir un core fuerte y estable.',
    duration: 25,
    exercises: ['3', '1', '4'],
    image: 'https://images.pexels.com/photos/6551136/pexels-photo-6551136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    level: 'Intermedio',
    category: 'Fuerza'
  },
  {
    id: '4',
    title: 'Flexibilidad y Movilidad',
    description: 'Mejora tu rango de movimiento y reduce la tensión muscular con esta rutina enfocada en flexibilidad.',
    duration: 35,
    exercises: ['2', '3'],
    image: 'https://images.pexels.com/photos/4056529/pexels-photo-4056529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    level: 'Principiante',
    category: 'Flexibilidad'
  },
  {
    id: '5',
    title: 'Potencia Superior',
    description: 'Desarrolla fuerza y definición en pecho, hombros, brazos y espalda superior.',
    duration: 40,
    exercises: ['1', '4'],
    image: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    level: 'Intermedio',
    category: 'Fuerza'
  }
];

export const categories = [
  'Todos',
  'Fuerza',
  'Cardio',
  'Flexibilidad',
  'HIIT'
];