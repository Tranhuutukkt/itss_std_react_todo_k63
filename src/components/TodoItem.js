/* 
  【TodoItemコンポーネント】
　・Todoアイテムを表示する
　・チェックボックスにチェックが入っているか管理する
　・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/

function TodoItem( {item, handleCheckBox} ) {

    return (

        <label className="panel-block">
            <input type="checkbox" onClick={() => handleCheckBox(item)}/>
            {item.done ? <p className='has-text-grey-light'>{item.text}</p>:<p>{item.text}</p>}
        </label>
  );
}

export default TodoItem;