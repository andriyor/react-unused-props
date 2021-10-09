import { TextVar } from './TextVar';
import { TextFunc } from './TextVarFunc';

function App() {
  return (
    <div className="App">
      <TextVar border={'dashed'} size={20} color={'red'} padding={20} margin={40} weight={800} align={'center'} />
      <TextVar border={'dashed'} color={'red'} padding={20} margin={40} weight={800} align={'center'} />
      <TextVar border={'dashed'} size={20} color={'red'} padding={20} margin={40} weight={800} align={'center'} />

      <TextFunc size={20} color={'red'} underline padding={20} margin={40} weight={800} align={'center'} />
      <TextFunc color={'red'} padding={20} underline margin={40} weight={800} align={'center'} />
      <TextFunc size={20} color={'red'} underline padding={20} margin={40} weight={800} align={'center'} />
    </div>
  );
}

export default App;
