import { useEffect, useState } from 'react';
import styled, { css, keyframes } from "styled-components";

import Cenik from './Cenik';
import '../styles/ostalo.css';
import {cene} from '../template/cenik';

function Ostalo () {
    const slide = keyframes`
        0% {left: -100%}
        2% {left: 0%}
        ${100 / Object.keys(cene).length - 5}% {left: 0%}
        ${100 / Object.keys(cene).length - 3}% {left: -100%}
        100% {left: -100%}
    `
    const autoplay1 = props => {
        let sekunde = 0;
        Object.keys(cene).forEach((tip, i) => {
            sekunde += i * Object.keys(cene[Object.keys(cene)[i]]).length * 4;
        })
    return css`
        ${Object.keys(cene).length * sekunde + 4}s ${slide} infinite ease-in-out;
    `}
    const Div = styled.div`
        position: absolute;
        left: -100%;
        width: 100%;
        animation: ${autoplay1};
    `

    return (
        <div className='ostalo'>
            <div id='slideset1'>
                {Object.keys(cene).map((tip, i) => (
                    <Div style={{ animationDelay: i * Object.keys(cene[Object.keys(cene)[i]]).length * 4 + 's'}}><Cenik 
                        tip={tip}
                        vozovnice={cene[Object.keys(cene)[i]]}/>
                    </Div>
                ))}
            </div>
        </div>
    )
}
export default Ostalo