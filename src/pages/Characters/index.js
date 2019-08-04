import React, { Component } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/all';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../components/Container';
import {
  Form,
  SubmitButton,
  List,
  DivInfo,
  PageActions,
  Title,
} from './styles';
import KeyMarvel from '../../services/keymarvel';

export default class Characters extends Component {
  state = {
    characters: [],
    loading: true,
    search: '',
    page: 1,
    offset: 0,
    orderBy: '-modified',
  };

  async componentDidMount() {
    await this.loadcharacters();
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const filter = { page: 1, offset: 0, loading: true };

    this.setState(filter);
    localStorage.setItem('filter', JSON.stringify(filter));

    await this.loadcharacters();
  };

  loadcharacters = async () => {
    const filter = await JSON.parse(localStorage.getItem('filter'));

    if (filter) {
      this.setState(filter);
    }

    const { offset, page, search, orderBy } = this.state;

    const param = {
      params: {
        ...(search ? { name: search } : { limit: 5, offset, orderBy }),
        ...KeyMarvel.getApiParams(),
      },
    };

    const result = await api.get('/characters', param);

    this.setState({
      characters: result.data.data.results,
      loading: false,
      page,
      offset,
      search: '',
    });
  };

  handlePage = async action => {
    let { page, offset } = this.state;

    page = action === 'back' ? page - 1 : page + 1;
    offset = action === 'back' ? offset - 5 : offset + 5;

    this.setState({ page, offset, loading: true });

    await localStorage.setItem('filter', JSON.stringify({ page, offset }));

    await this.loadcharacters();
  };

  render() {
    const { search, characters, loading, page } = this.state;

    return (
      <Container>
        <h1>
          <img
            src="http://images.universohq.com/2012/09/logo_marvel-g.jpg"
            alt=""
          />
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search your character"
            value={search}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaSearch color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <Title loading={loading ? 1 : 0}> Marvel Characters </Title>
        <List loading={loading ? 1 : 0}>
          {characters.map(item => (
            <li key={item.name}>
              <DivInfo>
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt=""
                />
                <div>
                  <span>{item.name}</span>
                  <p>{item.description}</p>
                </div>
              </DivInfo>

              <Link to={`/comic/${Number(item.id)}`}>
                <div>
                  <span>Comics</span>
                </div>
              </Link>
            </li>
          ))}
        </List>

        <PageActions>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePage('back')}
          >
            Back
          </button>
          <span>Page {page}</span>
          <button
            type="button"
            disabled={page === 1 && characters.length === 1}
            onClick={() => this.handlePage('next')}
          >
            Next
          </button>
        </PageActions>
      </Container>
    );
  }
}
