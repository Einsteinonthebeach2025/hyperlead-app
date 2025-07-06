import React from 'react';

const InfoDisplay = ({ data }) => {

  const renderContent = (item) => {
    switch (item.type) {
      case 'paragraph':
        return <p dangerouslySetInnerHTML={{ __html: item.content || item.text }} />;
      case 'list':
        return (
          <ul className="list-disc text-[10px] lg:text-sm list-inside space-y-1">
            {item.items.map((li, index) => <li key={index} dangerouslySetInnerHTML={{ __html: li }} />)}
          </ul>
        );
      case 'nested':
        return (
          <div className='ml-4'>
            <h3 className='font-semibold mt-2'>{item.title}</h3>
            {item.content && <p dangerouslySetInnerHTML={{ __html: item.content }} />}
            <ul className="list-disc list-inside space-y-1 text-[10px] lg:text-sm">
              {item.items.map((li, index) => <li key={index} dangerouslySetInnerHTML={{ __html: li }} />)}
            </ul>
          </div>
        )
      default:
        return null;
    }
  };

  return (
    <div className="text-left w-full max-h-[60vh] overflow-y-auto p-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
      {data.map((item, index) => {
        switch (item.type) {
          case 'paragraph':
            return <p key={index} dangerouslySetInnerHTML={{ __html: item.content }} />;
          case 'box':
            return (
              <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="font-bold text-blue-800 dark:text-blue-300">{item.title}</h3>
                {item.content.map((p, i) => <p key={i} className="text-blue-700 dark:text-blue-400 mt-2" dangerouslySetInnerHTML={{ __html: p }} />)}
              </div>
            );
          case 'section':
            return (
              <section key={index} className='space-y-2'>
                <h2 className="font-bold text-sm lg:text-lg">{item.title}</h2>
                {item.content.map((contentItem, i) => <div key={i}>{renderContent(contentItem)}</div>)}
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default InfoDisplay; 