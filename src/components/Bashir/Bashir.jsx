import React, {useState} from 'react'

const One = () => {
  return <div className="border text-center m-4 p-16 text-gray-900 text-4xl">one</div>;
};
const Two = () => {
  return <div className="border text-center m-4 p-16 text-gray-900 text-4xl">two</div>;
};

 const Bashir = () => {
    const [view, setView] = useState('one');

    function setViewToOne(){
      setView('one');
    }

   function setViewToTwo(){
      setView('two');
    }

  return (
    <div className="flex flex-col gap-y-4 h-screen w-screen">

      <div className="flex border gap-x-2 flex-row">
        <button className="p-4 border" onClick={()=>{setViewToOne()}}>One</button>
        <button className="p-4 border" onClick={()=>{setViewToTwo()}}>Two</button>
      </div>

        <div className="h-screen border-4 border-blue-500">
          {/* if the value of view is one, render component one */}
          {view === 'one' ? <One/> : ''}
          {/* if the value of view is two, render component two */}
          {view === 'two' ? <Two/> : ''}
        </div>
      
    </div>
  );
  
}
export default Bashir;

