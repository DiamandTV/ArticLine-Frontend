import { ProductContext } from "@features/store/context/ProductContext/ProductContext";
import { useContext } from "react";
import { Card } from "react-bootstrap";

export function Product(){
    return(
        <Card>

        </Card>
    )
}

Product.Image = function Image(){
    const {product} = useContext(ProductContext)
    if(!product) return null
    const image = product.image
    return(
        <div></div>
    )
}

Product.Favourite = function Favourite(){
    return(
        <div></div>
    )
}

Product.Title = function Title(){
    return(
        <div></div>
    )
}

Product.Description = function Description(){
    return(
        <div></div>
    )
}

Product.Category = function Category(){
    return(
        <div></div>
    )
}

Product.Price = function Price(){
    return(
        <div></div>
    )
}

Product.TemperatureStart = function TemperatureStart(){
    return(
        <div></div>
    )
}

Product.TemperatureEnd = function TemperatureEnd(){
    return(
        <div></div>
    )
}

Product.TemperatureRange = function TemperatureRange(){
    return(
        <div></div>
    )
}

export function ProductCard(){
    return(
        <div></div>
    )
}