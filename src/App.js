import { Text } from './Text';

function App() {
  return (
    <div className="App">
      <Text border={'dashed'} size={20} color={'red'} padding={20} margin={40} weight={800} align={'center'} />
      <Text border={'dashed'} color={'red'} padding={20} margin={40} weight={800} align={'center'} />
      <Text border={'dashed'} size={20} color={'red'} padding={20} margin={40} weight={800} align={'center'} />
    </div>
  );
}

export default App;
