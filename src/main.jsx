import react from "react";
import {getRecipeFromMistral} from "./AI.js";
import ReactMarkdown from "react-markdown"
export default function Main(){
    const [ingredients,setingredients]=react.useState([]);
    const formedingredients= ingredients.map(ingredient=>(
        <li key={ingredient}>{ingredient}</li>
    ))
    function RenderIngredients(Data){
        const newingredient=Data.get("newone")
        setingredients(prevones=>[...prevones,newingredient])
    }
    const [show,setShow]=react.useState("")
    async function recipeShow(){
        const recipe=await getRecipeFromMistral(ingredients)
        setShow(recipe)

    }
    return (
        <main>
            <form action={RenderIngredients} >
                <input type="text" aria-label="Add ingredient" placeholder="e.g. Chicken" name='newone'/>
                <button type="submit">+Add ingredient</button>
            </form>
            {ingredients.length>0 &&
            <div>
             <div>
                <h2>Ingredients we have:</h2>

                <ul>
                  {formedingredients}
                 </ul>
             </div>
             {ingredients.length >3 &&
             <div className="card">
                 <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                 </div>
                 <button onClick={recipeShow} >Get recipe</button>

             </div>}
                {show && <section className="recipes">
                    <p><ReactMarkdown>{show}</ReactMarkdown> </p>
                </section>}

             </div>
            }


        </main>
    )
}
