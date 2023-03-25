import type { GraphQLClient } from 'graphql-request';
import type * as Dom from 'graphql-request/src/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddMovieResponse = {
  created_at: Scalars['String'];
  id: Scalars['Int'];
  imdb_id: Scalars['String'];
  movie: Movie;
  movie_list_id: Scalars['Int'];
};

export type CreateListInput = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type CreateTodoListInput = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type Movie = {
  Actors?: Maybe<Scalars['String']>;
  Awards?: Maybe<Scalars['String']>;
  BoxOffice?: Maybe<Scalars['String']>;
  Country?: Maybe<Scalars['String']>;
  DVD?: Maybe<Scalars['String']>;
  Director?: Maybe<Scalars['String']>;
  Genre?: Maybe<Scalars['String']>;
  Language?: Maybe<Scalars['String']>;
  Metascore?: Maybe<Scalars['String']>;
  Plot?: Maybe<Scalars['String']>;
  Poster?: Maybe<Scalars['String']>;
  Production?: Maybe<Scalars['String']>;
  Rated?: Maybe<Scalars['String']>;
  Ratings?: Maybe<Array<Maybe<Rating>>>;
  Released?: Maybe<Scalars['String']>;
  Response?: Maybe<Scalars['String']>;
  Runtime?: Maybe<Scalars['String']>;
  Title?: Maybe<Scalars['String']>;
  Type?: Maybe<Scalars['String']>;
  Website?: Maybe<Scalars['String']>;
  Writer?: Maybe<Scalars['String']>;
  Year?: Maybe<Scalars['String']>;
  imdbID?: Maybe<Scalars['String']>;
  imdbRating?: Maybe<Scalars['String']>;
  imdbVotes?: Maybe<Scalars['String']>;
};

export type MovieList = {
  created_at: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type MovieListItem = {
  created_at: Scalars['String'];
  id: Scalars['Int'];
  imdb_id: Scalars['String'];
  movie: Movie;
  movie_list_id: Scalars['Int'];
};

export type Mutation = {
  addMovie: AddMovieResponse;
  addTODO: TodoListItem;
  createList: MovieList;
  createTODOList: TodoList;
  deleteList: Scalars['Boolean'];
  deleteTODOList: Scalars['Boolean'];
  finishTODO: TodoListItem;
  removeMovie: Scalars['Boolean'];
  removeTODO: Scalars['Boolean'];
};


export type MutationAddMovieArgs = {
  imdbId: Scalars['String'];
  listId: Scalars['Int'];
};


export type MutationAddTodoArgs = {
  desc: Scalars['String'];
  listId: Scalars['Int'];
};


export type MutationCreateListArgs = {
  input: CreateListInput;
};


export type MutationCreateTodoListArgs = {
  input: CreateTodoListInput;
};


export type MutationDeleteListArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTodoListArgs = {
  id: Scalars['Int'];
};


export type MutationFinishTodoArgs = {
  id: Scalars['Int'];
  listId: Scalars['Int'];
};


export type MutationRemoveMovieArgs = {
  id: Scalars['Int'];
  listId: Scalars['Int'];
};


export type MutationRemoveTodoArgs = {
  id: Scalars['Int'];
  listId: Scalars['Int'];
};

export type Query = {
  getMovieList: MovieList;
  getMovieListItems: Array<MovieListItem>;
  getMovieLists: Array<MovieList>;
  getTODOList: TodoList;
  getTODOLists: Array<TodoList>;
  getTODOs: Array<TodoListItem>;
  searchMovieById?: Maybe<Movie>;
  searchMovieByTitle?: Maybe<Array<Maybe<SearchMovie>>>;
};


export type QueryGetMovieListArgs = {
  id: Scalars['Int'];
};


export type QueryGetMovieListItemsArgs = {
  listId: Scalars['Int'];
};


export type QueryGetMovieListsArgs = {
  email: Scalars['String'];
};


export type QueryGetTodoListArgs = {
  id: Scalars['Int'];
};


export type QueryGetTodoListsArgs = {
  email: Scalars['String'];
};


export type QueryGetTodOsArgs = {
  listId: Scalars['Int'];
};


export type QuerySearchMovieByIdArgs = {
  id: Scalars['String'];
};


export type QuerySearchMovieByTitleArgs = {
  title: Scalars['String'];
  year?: InputMaybe<Scalars['String']>;
};

export type Rating = {
  Source?: Maybe<Scalars['String']>;
  Value?: Maybe<Scalars['String']>;
};

export type SearchMovie = {
  Poster?: Maybe<Scalars['String']>;
  Title?: Maybe<Scalars['String']>;
  Type?: Maybe<Scalars['String']>;
  Year?: Maybe<Scalars['String']>;
  imdbID?: Maybe<Scalars['String']>;
};

export type TodoList = {
  created_at: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type TodoListItem = {
  created_at: Scalars['String'];
  desc: Scalars['String'];
  finished: Scalars['Boolean'];
  id: Scalars['Int'];
  todo_list_id: Scalars['Int'];
};

export type GetMovieListsQueryVariables = Exact<{
  getMovieListId: Scalars['Int'];
}>;


export type GetMovieListsQuery = { getMovieList: { id: number, created_at: string, name: string, email: string } };

export type GetMovieListItemsQueryVariables = Exact<{
  listId: Scalars['Int'];
}>;


export type GetMovieListItemsQuery = { getMovieListItems: Array<{ id: number, created_at: string, imdb_id: string, movie_list_id: number, movie: { Title?: string | null, Year?: string | null, Rated?: string | null, Released?: string | null, Runtime?: string | null, Genre?: string | null, Director?: string | null, Writer?: string | null, Actors?: string | null, Plot?: string | null, Language?: string | null, Country?: string | null, Awards?: string | null, Poster?: string | null, Metascore?: string | null, imdbRating?: string | null, imdbVotes?: string | null, imdbID?: string | null, Type?: string | null, DVD?: string | null, BoxOffice?: string | null, Production?: string | null, Website?: string | null, Response?: string | null, Ratings?: Array<{ Source?: string | null, Value?: string | null } | null> | null } }> };

export type SearchMovieByTitleQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type SearchMovieByTitleQuery = { searchMovieByTitle?: Array<{ Title?: string | null, Poster?: string | null, Type?: string | null, Year?: string | null, imdbID?: string | null } | null> | null };

export type SearchMovieByIdQueryVariables = Exact<{
  searchMovieByIdId: Scalars['String'];
}>;


export type SearchMovieByIdQuery = { searchMovieById?: { Title?: string | null, Year?: string | null, Rated?: string | null, Released?: string | null, Runtime?: string | null, Genre?: string | null, Director?: string | null, Writer?: string | null, Actors?: string | null, Plot?: string | null, Language?: string | null, Country?: string | null, Awards?: string | null, Poster?: string | null, Metascore?: string | null, imdbRating?: string | null, imdbVotes?: string | null, imdbID?: string | null, Type?: string | null, DVD?: string | null, BoxOffice?: string | null, Production?: string | null, Website?: string | null, Response?: string | null, Ratings?: Array<{ Source?: string | null, Value?: string | null } | null> | null } | null };


export const GetMovieListsDocument = /*#__PURE__*/ gql`
    query GetMovieLists($getMovieListId: Int!) {
  getMovieList(id: $getMovieListId) {
    id
    created_at
    name
    email
  }
}
    `;
export const GetMovieListItemsDocument = /*#__PURE__*/ gql`
    query GetMovieListItems($listId: Int!) {
  getMovieListItems(listId: $listId) {
    id
    created_at
    imdb_id
    movie_list_id
    movie {
      Title
      Year
      Rated
      Released
      Runtime
      Genre
      Director
      Writer
      Actors
      Plot
      Language
      Country
      Awards
      Poster
      Ratings {
        Source
        Value
      }
      Metascore
      imdbRating
      imdbVotes
      imdbID
      Type
      DVD
      BoxOffice
      Production
      Website
      Response
    }
  }
}
    `;
export const SearchMovieByTitleDocument = /*#__PURE__*/ gql`
    query SearchMovieByTitle($title: String!) {
  searchMovieByTitle(title: $title) {
    Title
    Poster
    Type
    Year
    imdbID
  }
}
    `;
export const SearchMovieByIdDocument = /*#__PURE__*/ gql`
    query SearchMovieById($searchMovieByIdId: String!) {
  searchMovieById(id: $searchMovieByIdId) {
    Title
    Year
    Rated
    Released
    Runtime
    Genre
    Director
    Writer
    Actors
    Plot
    Language
    Country
    Awards
    Poster
    Ratings {
      Source
      Value
    }
    Metascore
    imdbRating
    imdbVotes
    imdbID
    Type
    DVD
    BoxOffice
    Production
    Website
    Response
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetMovieLists(variables: GetMovieListsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMovieListsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMovieListsQuery>(GetMovieListsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMovieLists', 'query');
    },
    GetMovieListItems(variables: GetMovieListItemsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMovieListItemsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMovieListItemsQuery>(GetMovieListItemsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMovieListItems', 'query');
    },
    SearchMovieByTitle(variables: SearchMovieByTitleQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchMovieByTitleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchMovieByTitleQuery>(SearchMovieByTitleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SearchMovieByTitle', 'query');
    },
    SearchMovieById(variables: SearchMovieByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchMovieByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchMovieByIdQuery>(SearchMovieByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SearchMovieById', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;