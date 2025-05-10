import { Exercise } from '@/types/exercise';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Flexiones',
    description: 'Ejercicio clásico que trabaja pecho, hombros y tríceps',
    muscleGroup: 'Pecho',
    equipment: ['Ninguno'],
    difficulty: 'Principiante',
    instructions: [
      'Comienza en posición de plancha con las manos un poco más separadas que los hombros',
      'Mantén el cuerpo recto y el core activado',
      'Baja el cuerpo hasta que el pecho casi toque el suelo',
      'Empuja hacia arriba hasta la posición inicial',
      'Mantén los codos cerca del cuerpo durante el movimiento'
    ],
    image: 'https://images.pexels.com/photos/176782/pexels-photo-176782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 45,
    sets: 3,
    reps: 12,
    restTime: 60,
    video: 'https://www.youtube.com/watch?v=IODxDxX7oi4'
  },
  {
    id: '2',
    name: 'Sentadillas',
    description: 'Ejercicio fundamental para piernas que trabaja cuádriceps, isquiotibiales y glúteos',
    muscleGroup: 'Piernas',
    equipment: ['Ninguno'],
    difficulty: 'Principiante',
    instructions: [
      'Párate con los pies separados al ancho de los hombros',
      'Mantén el pecho arriba y la espalda recta',
      'Baja flexionando rodillas y caderas como si fueras a sentarte',
      'Mantén las rodillas alineadas con los pies',
      'Baja hasta que los muslos estén paralelos al suelo',
      'Regresa a la posición inicial empujando con los talones'
    ],
    image: 'https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 45,
    sets: 3,
    reps: 15,
    restTime: 60,
    video: 'https://www.youtube.com/watch?v=aclHkVaku9U'
  },
  {
    id: '3',
    name: 'Plancha',
    description: 'Ejercicio isométrico que fortalece el core y mejora la estabilidad',
    muscleGroup: 'Core',
    equipment: ['Ninguno'],
    difficulty: 'Principiante',
    instructions: [
      'Apóyate sobre los antebrazos y las puntas de los pies',
      'Mantén el cuerpo en línea recta desde la cabeza hasta los talones',
      'Contrae el abdomen y los glúteos',
      'No dejes que la cadera se hunda',
      'Respira de manera constante durante el ejercicio'
    ],
    image: 'https://images.pexels.com/photos/6454069/pexels-photo-6454069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 30,
    sets: 3,
    reps: 1,
    restTime: 45,
    video: 'https://www.youtube.com/watch?v=ASdvN_XEl_c'
  },
  {
    id: '4',
    name: 'Burpees',
    description: 'Ejercicio de cuerpo completo que combina cardio y fuerza',
    muscleGroup: 'Cuerpo Completo',
    equipment: ['Ninguno'],
    difficulty: 'Avanzado',
    instructions: [
      'Comienza de pie con los pies separados al ancho de los hombros',
      'Baja a posición de sentadilla y coloca las manos en el suelo',
      'Salta llevando los pies hacia atrás a posición de plancha',
      'Realiza una flexión',
      'Salta llevando los pies cerca de las manos',
      'Salta verticalmente con los brazos arriba'
    ],
    image: 'https://images.pexels.com/photos/4162579/pexels-photo-4162579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 60,
    sets: 3,
    reps: 10,
    restTime: 90,
    video: 'https://www.youtube.com/watch?v=TU8QYVW0gDU'
  },
  {
    id: '5',
    name: 'Dominadas',
    description: 'Ejercicio compuesto para fortalecer la espalda y los brazos',
    muscleGroup: 'Espalda',
    equipment: ['Barra de dominadas'],
    difficulty: 'Avanzado',
    instructions: [
      'Agarra la barra con las palmas hacia adelante',
      'Cuelga con los brazos completamente extendidos',
      'Tira de tu cuerpo hacia arriba hasta que tu barbilla supere la barra',
      'Baja de manera controlada',
      'Mantén el core activado durante todo el movimiento'
    ],
    image: 'https://images.pexels.com/photos/6550851/pexels-photo-6550851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 40,
    sets: 3,
    reps: 8,
    restTime: 90,
    video: 'https://www.youtube.com/watch?v=eGo4IYlbE5g'
  },
  {
    id: '6',
    name: 'Zancadas',
    description: 'Ejercicio unilateral para piernas que mejora el equilibrio y la fuerza',
    muscleGroup: 'Piernas',
    equipment: ['Ninguno'],
    difficulty: 'Intermedio',
    instructions: [
      'Comienza de pie con los pies juntos',
      'Da un paso largo hacia adelante',
      'Baja la cadera hasta que ambas rodillas formen ángulos de 90 grados',
      'Mantén el torso erguido',
      'Empuja con el pie delantero para volver a la posición inicial'
    ],
    image: 'https://images.pexels.com/photos/4498603/pexels-photo-4498603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    duration: 45,
    sets: 3,
    reps: 12,
    restTime: 60,
    video: 'https://www.youtube.com/watch?v=QE_hU8XX48I'
  }
];