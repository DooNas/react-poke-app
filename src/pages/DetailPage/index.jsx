import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const DetailPage = () => {

  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
        console.log('stats', stats);

        const DamageRelations = await Promise.all(
          types.map(async (i) => {
            console.log('i', i)
            const type = await axios.get(i.type.url);
            console.log('type', type);
            return type.data.damage_relations
          })
        )

        const formattedPokemonData = {
          id: id,
          name: name,
          weight: weight / 10,
          height: height / 10,
          previous: nextAndPreviousPokemon.previous,
          next: nextAndPreviousPokemon.next,
          abilities: formatPokemonAbilities(abilities),
          stats: formatPokemonStats(stats),
          DamageRelations
        }
        setPokemon(formattedPokemonData);
        setIsLoading(false);
        console.log('formattedPokemonData', formattedPokemonData)

      }
    } catch (error) {
      console.log(error);
    }
  }

  const formatPokemonStats = ([
    // stats의 배열을 구조분해 처리
    statHP,
    statATK,
    statDEP,
    statSATK,
    statSDEP,
    statSPD
  ]) => [
    {name: 'Hit Points', baseStat: statHP.base_stat },
    {name: 'Attack', baseStat: statATK.base_stat },
    {name: 'Defense', baseStat: statDEP.base_stat },
    {name: 'Special Attack', baseStat: statSATK.base_stat },
    {name: 'Special Defense', baseStat: statSDEP.base_stat },
    {name: 'Speed', baseStat: statSPD.base_stat },
  ]

  const formatPokemonAbilities = (abilities) => {
    return abilities.filter((_, index) => index <= 1 )
                    .map((obj) => obj.ability.name.replaceAll('-', ' '));
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

  if(isLoading) return <div>...loading</div>

  return (
    <div>DetailPage</div>
  )
}

DetailPage.propTypes = {}

export default DetailPage