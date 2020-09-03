import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import SwapRate from "./SwapRate";
import axios from 'axios'

const App = () => {
    const [selectedA, setSelectedA] = useState("USD");
    const [selectedB, setSelectedB] = useState("EUR");
    const [valueA, setValueA] = useState(1);
    const [valueB, setValueB] = useState(0.84)
    const [conversionRate, setConversionRate] = useState(null)
    useEffect(() => {
        const makeRequest = async () => {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${selectedA}`);
            setConversionRate(response.data.rates[selectedB]);
            setValueB((valueA * conversionRate).toFixed(2));
        }
        makeRequest();
    }, [valueA, selectedA, selectedB, conversionRate])
    const onDropdownAChange = (e) => {
        //e.persist();
        setSelectedA(e.target.value);
    };
    const onDropdownBChange = (e) => {
        //e.persist();
        setSelectedB(e.target.value);
    };
    const onSwap = () => {
        let tmp = selectedA;
        setSelectedA(selectedB);
        setSelectedB(tmp);
    };
    const onValueChangeA = (e) => {
        setValueA(e.target.value);
        if(e.target.value < 0){
            setValueA(0);
        }
    }
    return (
        <div>
            <img
                src="https://vanillawebprojects.com/projects/exchange-rate/img/money.png"
                alt=""
                className="money-img"
            />
            <h1 style={{textAlign: 'center'}}>Exchange Rate Calculator</h1>
            <p>Choose the currency and the amounts to get the exchange rate</p>
            <div className="container">
                <Dropdown
                    selected={selectedA}
                    onDropdownChange={onDropdownAChange}
                    inputValue={valueA}
                    onValueChange={onValueChangeA}
                />
                <SwapRate
                    selectedA={selectedA}
                    selectedB={selectedB}
                    onSwap={onSwap}
                    conversionRate={conversionRate}
                />
                <Dropdown
                    selected={selectedB}
                    onDropdownChange={onDropdownBChange}
                    inputValue={valueB}
                />
            </div>
        </div>
    );
};

export default App;
