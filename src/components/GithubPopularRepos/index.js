import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    isLoading: true,
    repositoriesData: [],
    selectedLanguage: 'ALL',
  }

  componentDidMount() {
    this.getProducts(languageFiltersData[0].id)
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  getProducts = async selectedLanguage => {
    this.setState({isLoading: true})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${selectedLanguage}`,
    )
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        imageUrl: eachRepository.avatar_url,
        name: eachRepository.name,
        starsCount: eachRepository.stars_count,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
      }))
      this.setState({repositoriesData: updatedData, isLoading: false})
    } else {
      this.renderFailureView()
    }
  }

  selectLanguageFilter = newId => {
    this.setState({selectedLanguage: newId})
    this.getProducts(newId)
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderRepositoriesList = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repositories-list-container">
        {repositoriesData.map(repositoryData => (
          <RepositoryItem
            key={repositoryData.id}
            repositoryData={repositoryData}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {selectedLanguage, isLoading} = this.state
    return (
      <div className="bg-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-list">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              isSelected={eachData.id === selectedLanguage}
              key="eachData.id"
              languageDetails={eachData}
              selectLanguageFilter={this.selectLanguageFilter}
            />
          ))}
        </ul>
        {isLoading ? this.renderLoader() : this.renderRepositoriesList()}
      </div>
    )
  }
}
export default GithubPopularRepos
