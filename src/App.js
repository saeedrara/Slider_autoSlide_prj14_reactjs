import { useEffect, useState } from "react";
import data from './data';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function App() {

  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);
  useEffect(()=>{
    let lastIndex = people.length - 1;
    if(index < 0){
      setIndex(lastIndex)
    }
    if(index> lastIndex){
      setIndex(0)
    }
  }, [index,people])

  useEffect(()=>{
    let Silder = setInterval(()=>{
      setIndex(index+1);
    },3000)
    return ()=>clearInterval(Silder)
  },[index])
 

  return (
    <div className="section">
      <div className="title">
        <span>نظرات مشتریان</span>
      </div>
      <div className="section-center">
        {
          people.map((person, personIndex)=> {
            const {id,image,name,title,qoute} = person;

            let position = "nextSlide";
            if(personIndex === index){
              position = "activeSlide"
            }
            if(personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
              position = "lastSlide"
            }

            return(
             <article className={position} key={id}>
                <img src={image} alt={name} className="person-img" />
                <h4>{name}</h4>
                <p className="title">{title}</p>
                <p className="qoute">{qoute}</p>
             </article>
            )
          })
        }

        <button className="next" onClick={()=> setIndex(index+1)}>
          <FiChevronRight />
        </button>
        <button className="prev" onClick={()=> setIndex(index-1)}>
          <FiChevronLeft />
        </button>
      </div>
    </div>
  );
}

export default App;
