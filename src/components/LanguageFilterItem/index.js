import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isSelected, selectLanguageFilter} = props
  const {language, id} = languageDetails

  const onClickBtnLanguage = () => {
    selectLanguageFilter(id)
  }
  const btnClassName = isSelected
    ? 'language-btn selected-language-btn'
    : 'language-btn'

  return (
    <li type="none">
      <button
        className={btnClassName}
        onClick={onClickBtnLanguage}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
