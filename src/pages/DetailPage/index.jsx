import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { Loading } from '../../assets/Loading';
import { LessThan } from '../../assets/LessThan';
import GreaterThan from '../../assets/GreaterThan';

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
          DamageRelations,
          types: types.map(type => type.type.name)
        }
        setPokemon(formattedPokemonData);
        setIsLoading(false);
        console.log('formattedPokemonData', formattedPokemonData)
        
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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

  if(isLoading) {
    return (
      <div className={
          `absolute h-auto w-auto top-1/3 -translate-x-1/2 left-1/2 z-50`
      }>
        <Loading className='w-12 h-12 z-50 animate-spin text-slate-900' />

      </div>
    )
  }

  if(!isLoading && !pokemon) {
    return (
      <div>...NOT FOUND</div>
    )
  }

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork//${pokemon?.id}.png`;
  const bg = `bg-${pokemon?.type?.[0]}`;
  const text = `text-${pokemon?.types?.[0]}`;
  console.log(pokemon, bg, text);

  return (
    <article className='flex items-center gap-1 flex0col w-full'>
      <div
        className={
          `${bg} w-auto h-full flex flex-col z-0 items-center justify-end relative overflow-hidden`
        }
      >
        {pokemon.previous && (
          <Link 
            className='absolute top-[40%] -translate-y-1/2 z-50 left-1'
            to={`/pokemon/${pokemon.previous}`}
          >
            <LessThan className='w-6 h-8 p-1'/>
          </Link>
        )}

        asdfasdf
        {pokemon.next && (
          <Link 
            className='absolute top-[40%] -translate-y-1/2 z-50 right-1'
            to={`/pokemon/${pokemon.next}`}
          >
            <GreaterThan className='w-6 h-8 p-1'/>
          </Link>
        )}
      </div>
    </article>
  )
}

DetailPage.propTypes = {}

export default DetailPage