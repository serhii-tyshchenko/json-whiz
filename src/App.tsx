import JsonViewer from './JsonViewer/JsonViewer';
import { testData } from './mocks';

function App() {

  return (
    <>
    <h1>Json Whiz App</h1>
    <JsonViewer data={testData} />
    </>
  )
}

export default App
