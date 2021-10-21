import { createContext, Component } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export const SearchContext = createContext();


class SearchContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopList: [],
      currentCoords: { lat: 55.755826, lng: 37.6172999 },
      selectedShop: {},
      google: undefined,
    };
    this.loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      version: 'weekly',
      libraries: ['drawing', 'geometry', 'places'],
    });
    this.updateList = this.updateList.bind(this);
    this.updateCoords = this.updateCoords.bind(this);
    this.selectShop = this.selectShop.bind(this);

  }

  updateList(list) {
    this.setState({ shopList: list });
  }

  updateCoords(coords) {
    this.setState({ currentCoords: coords });
  }

  selectShop(shop) {
    this.setState({ selectedShop: shop });
  }

  componentDidMount() {
    this.loader.load().then((google) => {
      this.setState({google: google})
    });
  }

  render() {
    return (
      <SearchContext.Provider value={{
        ...this.state,
        updateList: this.updateList,
        updateCoords: this.updateCoords,
        selectShop: this.selectShop,
      }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchContextProvider;
