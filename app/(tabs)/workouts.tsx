import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Search, Filter, X } from 'lucide-react-native';
import { workouts, categories } from '@/data/workouts';
import WorkoutListItem from '@/components/WorkoutListItem';

export default function WorkoutsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredWorkouts = workouts.filter(workout => {
    const matchesCategory = selectedCategory === 'Todos' || workout.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateWorkout = () => {
    // Implementar lógica para crear entrenamiento
    console.log('Crear nuevo entrenamiento');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        {showSearch ? (
          <View style={styles.searchBar}>
            <Search color={Colors.neutral[500]} size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar entrenamientos..."
              placeholderTextColor={Colors.neutral[400]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            <TouchableOpacity onPress={() => {
              setSearchQuery('');
              setShowSearch(false);
            }}>
              <X color={Colors.neutral[500]} size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.headerTitle}>Entrenamientos</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => setShowSearch(true)}
              >
                <Search color={Colors.neutral[700]} size={24} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => setShowFilters(!showFilters)}
              >
                <Filter color={Colors.neutral[700]} size={24} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text 
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.workoutsList} showsVerticalScrollIndicator={false}>
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <WorkoutListItem key={workout.id} workout={workout} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No se encontraron entrenamientos</Text>
            <Text style={styles.emptyStateSubtext}>Intenta ajustar tus filtros</Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleCreateWorkout}
      >
        <Text style={styles.addButtonText}>CREAR ENTRENAMIENTO</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: 'Oswald-Bold',
    fontSize: 28,
    color: Colors.neutral[800],
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 8,
    color: Colors.neutral[800],
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  categoryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  categoryButtonTextActive: {
    color: Colors.white,
  },
  workoutsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.neutral[700],
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
  addButton: {
    margin: 20,
    backgroundColor: Colors.secondary[500],
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 16,
    color: Colors.white,
    letterSpacing: 1,
  },
});