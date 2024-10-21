import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ToDoItem from './components/ToDoItem';
import AddItemButton from './components/AddItemButton';
import FilterButton from './components/FilterButton';
import { useState, useEffect } from 'react';
import ToDoInput from './components/ToDoInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [toDoItem, setTodoItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Für die Bearbeitung
  const [selectedFilter, setSelectedFilter] = useState("All Tasks"); // Zustand für den ausgewählten Filter

  function startAddToDoItemHandler() {
    setModalVisible(true);
  }

  function endAddToDoItemHandler() {
    setModalVisible(false);
  }

  function delateToDoItemHandler(id) {
    setTodoItems((currentToDoItem) => {
      return currentToDoItem.filter((toDoItem) => toDoItem.id !== id);
    });
  }

  function addToDoItemHandler(toDoItemText) {
    setTodoItems((currentToDoItem) => [
      ...currentToDoItem,
      { text: toDoItemText, id: Math.random().toString(), isDone: false },
    ]);
    endAddToDoItemHandler();
  }

  function toggleTaskStatusHandler(id) {
    setTodoItems((currentToDoItem) =>
      currentToDoItem.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  }

  function filteredToDoItems() {
    if (selectedFilter === "Done Tasks") {
      return toDoItem.filter(item => item.isDone);
    } else if (selectedFilter === "Open Tasks") {
      return toDoItem.filter(item => !item.isDone);
    }
    return toDoItem; // Bei "All Tasks" alle zurückgeben
  }

  function startEditToDoItemHandler(item) {
    setSelectedItem(item); // Setze das ausgewählte Item
    setModalVisible(true);
  }

  function editToDoItemHandler(editedText) {
    setTodoItems((currentToDoItem) =>
      currentToDoItem.map((item) =>
        item.id === selectedItem.id ? { ...item, text: editedText } : item // Update das bearbeitete Item
      )
    );
    setSelectedItem(null);
    endAddToDoItemHandler();
  }

  async function saveToDoItems(items) {
    try {
      const jsonValue = JSON.stringify(items);
      await AsyncStorage.setItem('toDoItems', jsonValue);
    } catch (e) {
      console.error('Failed to save items to AsyncStorage', e);
    }
  }

  // Daten laden
  async function loadToDoItems() {
    try {
      const jsonValue = await AsyncStorage.getItem('toDoItems');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Failed to load items from AsyncStorage', e);
      return [];
    }
  }

  // Lade die To-Do-Items beim Start der App
  useEffect(() => {
    loadToDoItems().then(setTodoItems);
  }, []);

  // Speichere die To-Do-Items jedes Mal, wenn sie sich ändern
  useEffect(() => {
    saveToDoItems(toDoItem);
  }, [toDoItem]);

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View>
          <Text style={styles.textStyle}>To-Do List</Text>
        </View>
        <View style={styles.filterContainer}>
          <FilterButton selectedFilter={selectedFilter} onFilterSelect={setSelectedFilter} />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={filteredToDoItems()}
            renderItem={(itemData) => {
              return (
                <ToDoItem
                  text={itemData.item.text}
                  onDeleteItem={delateToDoItemHandler}
                  id={itemData.item.id}
                  isDone={itemData.item.isDone}
                  onToggleTask={() => toggleTaskStatusHandler(itemData.item.id)}
                  onEditItem={() => startEditToDoItemHandler(itemData.item)} // Hier übergeben
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.addContainer}>
          <AddItemButton onPress={startAddToDoItemHandler} />
        </View>
        <ToDoInput
          visible={modalVisible}
          onAddToDoItem={selectedItem ? editToDoItemHandler : addToDoItemHandler}
          onCancel={endAddToDoItemHandler}
          initialText={selectedItem ? selectedItem.text : ''}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  textStyle: {
    marginTop: 50,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#545F71',
  },
  listContainer: {
    flex: 5,
    marginTop: 20,
  },
  addContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  filterContainer: {
    marginTop: 20,
  },
});
