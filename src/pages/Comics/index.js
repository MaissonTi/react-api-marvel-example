import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaSpinner } from 'react-icons/all';
import { format } from 'date-fns';

import ru from 'date-fns/locale/ru';
import Container from '../../components/Container';
import api from '../../services/api';
import KeyMarvel from '../../services/keymarvel';

import { DuvButton, Button, Loading, Owner, IssueList, Title } from './styles';

export default class Comics extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    characters: {},
    comics: [],
    loading: true,
    loadingComic: false,
    more: 0,
  };

  async componentDidMount() {
    await this.loadComics();
  }

  loadComics = async () => {
    const { match } = this.props;
    const { more, comics } = this.state;

    const charactersData = await api.get(`/characters`, {
      params: { ...KeyMarvel.getApiParams(), id: match.params.id },
    });

    const characters = charactersData.data.data.results[0];

    const comicsData = await Promise.all(
      characters.comics.items.slice(more, more + 3).map(item => {
        return api.get(`/comics`, {
          params: {
            ...KeyMarvel.getApiParams(),
            id: item.resourceURI.split('comics/')[1],
          },
        });
      })
    );

    this.setState({
      characters,
      comics: [...comics, ...comicsData],
      loading: false,
      loadingComic: false,
    });
  };

  handleMoreComic = async () => {
    const { more } = this.state;
    await this.setState({ more: more + 3, loadingComic: true });
    await this.loadComics();
  };

  render() {
    const { characters, comics, loading, loadingComic } = this.state;

    if (loading) {
      return (
        <Loading>
          <img
            src="https://yokoent.com/images/deadpool-png-animated-gif-12.gif"
            alt=""
          />
          <h1>Loading...</h1>
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaArrowLeft />
          </Link>
          <img
            src={`${characters.thumbnail.path}.${characters.thumbnail.extension}`}
            alt=""
          />
          <h1>{characters.name}</h1>
          <p>{characters.description}</p>
        </Owner>

        <IssueList>
          <Title>Comics</Title>

          {comics.map(comic => {
            const item = comic.data.data.results[0];
            return (
              <li key={String(item.id)}>
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt=""
                />
                <div>
                  <strong>
                    <p>{item.title}</p>
                  </strong>
                  <p>{item.description}</p>
                  <strong>
                    Published:
                    <span>
                      {format(item.modified, 'MMMM DD,  YYYY ', {
                        locate: ru,
                      })}
                    </span>
                  </strong>
                </div>
              </li>
            );
          })}
        </IssueList>
        <DuvButton>
          <Button
            onClick={() => this.handleMoreComic()}
            loading={loadingComic ? 1 : 0}
          >
            <div>
              <span> {loadingComic ? <FaSpinner /> : 'More'} </span>
            </div>
          </Button>
        </DuvButton>
      </Container>
    );
  }
}
