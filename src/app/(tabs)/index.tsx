import Filter from '@src/components/Filter';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Index() {
  const [activeFilter, setActiveFilter] = useState<string>('');

  function onFilterItemClick(filterKey: string) {
    setActiveFilter(filterKey);
  }

  return (
    <View style={styles.container}>
      <Filter activeFilter={activeFilter} onItemClick={onFilterItemClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
