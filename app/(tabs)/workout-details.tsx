import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Modal, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ChevronLeft, Clock, Dumbbell, Play, Heart, Youtube } from 'lucide-react-native';
import { workouts } from '@/data/workouts';
import { exercises } from '@/data/exercises';
import { WebView } from 'react-native-webview';

export default function WorkoutDetailsScreen() {
  const { id } = useLocalSearchParams();
  const workout = workouts.find(w => w.id === id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  if (!workout) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Entrenamiento no encontrado</Text>
      </SafeAreaView>
    );
  }

  const workoutExercises = exercises.filter(exercise => 
    workout.exercises.includes(exercise.id)
  );

  const handleStartWorkout = () => {
    setShowGuide(true);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleExercisePress = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleWatchVideo = (videoUrl) => {
    Linking.openURL(videoUrl);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color={Colors.white} size={28} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <Heart 
              color={Colors.white} 
              size={24} 
              fill={isFavorite ? Colors.white : 'none'}
            />
          </TouchableOpacity>
          <Image source={{ uri: workout.image }} style={styles.headerImage} />
          <View style={styles.headerOverlay} />
          <View style={styles.headerContent}>
            <Text style={styles.title}>{workout.title}</Text>
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Clock color={Colors.white} size={16} />
                <Text style={styles.statText}>{workout.duration} min</Text>
              </View>
              <View style={styles.stat}>
                <Dumbbell color={Colors.white} size={16} />
                <Text style={styles.statText}>{workoutExercises.length} ejercicios</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{workout.description}</Text>

          <Text style={styles.sectionTitle}>Ejercicios</Text>
          {workoutExercises.map((exercise, index) => (
            <TouchableOpacity 
              key={exercise.id} 
              style={styles.exerciseCard}
              onPress={() => handleExercisePress(exercise)}
            >
              <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
              <View style={styles.exerciseContent}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>
                  {exercise.sets} series • {exercise.reps} repeticiones
                </Text>
                <Text style={styles.exerciseDescription} numberOfLines={2}>
                  {exercise.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={handleStartWorkout}
        >
          <Play color={Colors.white} size={20} />
          <Text style={styles.startButtonText}>COMENZAR ENTRENAMIENTO</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showGuide}
        animationType="slide"
        onRequestClose={() => setShowGuide(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Guía de Entrenamiento</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowGuide(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {workoutExercises.map((exercise, index) => (
              <View key={exercise.id} style={styles.guideExercise}>
                <Text style={styles.guideExerciseTitle}>
                  {index + 1}. {exercise.name}
                </Text>
                <Image 
                  source={{ uri: exercise.image }} 
                  style={styles.guideExerciseImage} 
                />
                <View style={styles.guideExerciseDetails}>
                  <Text style={styles.guideExerciseInfo}>
                    Series: {exercise.sets} • Repeticiones: {exercise.reps}
                  </Text>
                  <Text style={styles.guideExerciseInfo}>
                    Descanso: {exercise.restTime} segundos
                  </Text>
                </View>
                <Text style={styles.instructionsTitle}>Instrucciones:</Text>
                {exercise.instructions.map((instruction, idx) => (
                  <Text key={idx} style={styles.instructionText}>
                    • {instruction}
                  </Text>
                ))}
                <TouchableOpacity
                  style={styles.videoButton}
                  onPress={() => handleWatchVideo(exercise.video)}
                >
                  <Youtube color={Colors.white} size={20} />
                  <Text style={styles.videoButtonText}>Ver Video Tutorial</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={selectedExercise !== null}
        animationType="slide"
        onRequestClose={() => setSelectedExercise(null)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedExercise?.name}</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedExercise(null)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {selectedExercise && (
              <View style={styles.exerciseDetail}>
                <Image 
                  source={{ uri: selectedExercise.image }} 
                  style={styles.exerciseDetailImage} 
                />
                <Text style={styles.exerciseDetailDescription}>
                  {selectedExercise.description}
                </Text>
                <View style={styles.exerciseDetailInfo}>
                  <Text style={styles.exerciseDetailInfoText}>
                    Grupo Muscular: {selectedExercise.muscleGroup}
                  </Text>
                  <Text style={styles.exerciseDetailInfoText}>
                    Dificultad: {selectedExercise.difficulty}
                  </Text>
                  <Text style={styles.exerciseDetailInfoText}>
                    Equipamiento: {selectedExercise.equipment.join(', ')}
                  </Text>
                </View>
                <Text style={styles.instructionsTitle}>Instrucciones:</Text>
                {selectedExercise.instructions.map((instruction, idx) => (
                  <Text key={idx} style={styles.instructionText}>
                    {idx + 1}. {instruction}
                  </Text>
                ))}
                <TouchableOpacity
                  style={styles.videoButton}
                  onPress={() => handleWatchVideo(selectedExercise.video)}
                >
                  <Youtube color={Colors.white} size={20} />
                  <Text style={styles.videoButtonText}>Ver Video Tutorial</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Oswald-Bold',
    fontSize: 32,
    color: Colors.white,
    marginBottom: 12,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.white,
    marginLeft: 6,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 20,
    color: Colors.neutral[800],
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
    lineHeight: 24,
    marginBottom: 24,
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  exerciseImage: {
    width: 100,
    height: 100,
  },
  exerciseContent: {
    flex: 1,
    padding: 12,
  },
  exerciseName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  exerciseDetails: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 4,
  },
  exerciseDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
  },
  footer: {
    padding: 20,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  startButton: {
    backgroundColor: Colors.secondary[500],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 16,
    color: Colors.white,
    marginLeft: 8,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  modalTitle: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 24,
    color: Colors.neutral[800],
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.primary[500],
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  guideExercise: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  guideExerciseTitle: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 20,
    color: Colors.neutral[800],
    marginBottom: 12,
  },
  guideExerciseImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  guideExerciseDetails: {
    backgroundColor: Colors.neutral[100],
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  guideExerciseInfo: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: 4,
  },
  instructionsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 8,
  },
  instructionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 6,
    lineHeight: 20,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary[500],
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  videoButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.white,
    marginLeft: 8,
  },
  exerciseDetail: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  exerciseDetailImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  exerciseDetailDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[700],
    marginBottom: 16,
    lineHeight: 24,
  },
  exerciseDetailInfo: {
    backgroundColor: Colors.neutral[100],
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  exerciseDetailInfoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: 8,
  },
});