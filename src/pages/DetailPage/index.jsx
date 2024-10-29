import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const DetailPage = props => {

  const params = useParams();
  const pokemonId = params.id;
  const baseUrl = `http://pokeapi.co/api/v2/pokemon/`;
  console.log(params.id);

  useEffect(() => {
    fetchPokemonData();
  }, [])
  

  async function fetchPokemonData() {
    const url = `${baseUrl}${pokemonId}`
    try{
      const { data: pokemonData } = await axios.get(url);

      if (pokemonData) {
        const { name, id, types, weight, height, stats, abilities } = pokemonData;
        const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);
        console.log(nextAndPreviousPokemon);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getNextAndPreviousPokemon(id) {
    const urlPokemon = `${baseUrl}?limit=1&offset=${id - 1}`;
    // prev 와 nest pokemon의 정보를 알 수 있는 url을 가지기 위해 요청을 보냄
    const { data: pokemonData } = await axios.get(urlPokemon);
    console.log( "****",pokemonData )
    // pokemonData에 pokemon url이 담김.

    const nextResponse = pokemonData.next && (await axios.get(pokemonData.next));
    
    const previousResponse = pokemonData.previous && (await axios.get(pokemonData.previous));

    console.log('previousResponse', previousResponse);

    return {
      next: nextResponse?.data?.results?.[0].name,
      previous:  previousResponse?.data?.results?.[0]?.name
    }
  }

  return (
    <div>DetailPage</div>
  )
}

DetailPage.propTypes = {}

export default DetailPage