import React from 'react';
import {
    Container,
    TypeTitle,
    TypeDescription,
    TypeImage,
    RequestButton,
    RequestButtonText,
} from './styles';

import uberx from '../../assets/uberx.png';



const Details = () => {
    return (<Container>
        <TypeTitle>Popular</TypeTitle>
        <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>

        <TypeImage source={uberx} />
        <TypeTitle>Uberx</TypeTitle>
        <TypeDescription>R$12,00</TypeDescription>

        <RequestButton onPress={() => {alert("Pra vc é gratis BB")}}>
            <RequestButtonText>SOLICITAR UBERX</RequestButtonText>
        </RequestButton>
    </Container>);
};

export default Details;
