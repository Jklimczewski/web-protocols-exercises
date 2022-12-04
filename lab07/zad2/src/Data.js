const Data = (props) => {

    const handlerName = (event) => {
        props.setName(event.target.value);
    }
    const handlerSurrname = (event) => {
        props.setSurrname(event.target.value);
    }

    return (
        <div>
            Name:
            <input type='text' onChange={handlerName}></input>
            Surrname:
            <input type='text' onChange={handlerSurrname}></input>
        </div>
    )
};

export default Data;