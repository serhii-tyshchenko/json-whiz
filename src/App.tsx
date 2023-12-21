import { useState } from 'react';
import { JsonViewer } from './json-viewer';
import { testData } from './mocks';

const initialConfig = {
  showItemsCount: false,
  showKeyIndexes: false,
  hideKeys: false,
};

function App() {
  const [config, setConfig] = useState(initialConfig);

  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setConfig({
      ...config,
      [name]: checked,
    });
  };

  return (
    <>
      <h1>Json Whiz App</h1>
      <fieldset className="mb-4">
        <legend>Config</legend>
        <div className="d-flex align-items-center mb-2">
          <label htmlFor="showItemsCount" className="mr-1">
            Show Items Count
          </label>
          <input
            type="checkbox"
            id="showItemsCount"
            name="showItemsCount"
            onChange={handleChnage}
            checked={config.showItemsCount}
          />
        </div>
        <div className="d-flex align-items-center mb-2">
          <label htmlFor="showKeyIndexes" className="mr-1">
            Show Key Indexes
          </label>
          <input
            type="checkbox"
            id="showKeyIndexes"
            name="showKeyIndexes"
            onChange={handleChnage}
            checked={config.showKeyIndexes}
          />
        </div>
        <div className="d-flex align-items-center">
          <label htmlFor="hideKeys" className="mr-1">
            Hide Keys
          </label>
          <input
            type="checkbox"
            id="hideKeys"
            name="hideKeys"
            onChange={handleChnage}
            checked={config.hideKeys}
          />
        </div>
      </fieldset>
      <JsonViewer
        data={testData}
        showItemsCount={config.showItemsCount}
        showKeyIndexes={config.showKeyIndexes}
        hideKeys={config.hideKeys}
      />
    </>
  );
}

export default App;
