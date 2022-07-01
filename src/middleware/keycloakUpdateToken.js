import Vue from 'vue';

const MIN_TOKEN_VALIDITY = 70;

export default async function updateToken () {
    await Vue.$keycloak.updateToken(MIN_TOKEN_VALIDITY);
    return Vue.$keycloak.idToken;
}