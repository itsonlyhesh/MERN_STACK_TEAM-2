import "./Home.css";

const perfumes = [

{
name:"Floral",
image:"https://images.unsplash.com/photo-1594035910387-fea47794261f"
},

{
  name: "Bleu de Chanel",
  image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80"
},
{
name:"Oriental",
image:"https://images.unsplash.com/photo-1588405748880-12d1d2a59f75"
},

{
  name: "Fresh",
  image: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg"
},

{
name:"Fruity",
image:"https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd"
},

{
name:"Citrus",
image:"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539"
}

];

function Home(){

return(

<div className="container">

<h1>Discover Your Signature Scent</h1>

<p>
Explore our curated perfume collection categorized by fragrance family.
</p>

<div className="grid">

{perfumes.map((item,index)=>(

<div className="card" key={index}>

<img src={item.image} alt={item.name}/>

<h3>{item.name}</h3>

<button>View</button>

</div>

))}

</div>

</div>

);

}

export default Home;