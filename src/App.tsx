import { useState } from 'react';
import Fibonacci from './components/Fibonacci';
import Search from './components/Search';
import Animation from './components/Animation';

interface AppProps {
  id: number;
  title: string;
  component: JSX.Element;
}

const pages: AppProps[] = [
  { id: 1, title: 'Fibonacci', component: <Fibonacci /> },
  { id: 2, title: 'Search', component: <Search /> },
  {id: 3, title: 'Animation', component: <Animation />}
];

function App(): JSX.Element {
  const [tab, setTab] = useState(1);

  const setMenu = (id: number) => {
    const tabs = pages.filter(t => t.id === id);

    return tabs.length === 1 ? tabs[0].component : null;
  };

  return (
    <>
      <div className="tabs mb-10">
        {
          pages.map(t =>
            <a
              key={t.id}
              className={`tab tab-lg tab-lifted ${tab === t.id ? 'tab-active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.title}
            </a>
          )
        }
      </div>
      {setMenu(tab)}
    </>
  );
}

export default App;
