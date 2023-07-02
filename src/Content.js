const Content = ({item,change,deleteItem}) =>{
    return(
        <div className="content">
            {item.length?(
                <div>
                {item.map((items)=>(
                <div key={items.id}>
                    <input type="checkbox"
                        checked={items.checked}
                        value={items.text}
                        id={items.id}
                        onChange={()=>change(items.id)}
                    />
                    <label htmlFor={items.id}>
                        {items.text}
                    </label>
                    <button className="delete"
                        type="button"
                        onClick={()=>deleteItem(items.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
            </div>
            ):(
                <p
                style={
                    {
                        fontSize:'40px',
                        left:'5px',
                        position:'relative'
                    }
                }
                >List is Empty</p>
            )}
        </div>
    )
}
export default Content;