'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [Done] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

const optArticleSelector = '.post', // zawartośc artykułu
  optTitleSelector = '.post-title', // tytuły artykułów w poście
  optTitleListSelector = '.titles', // tytuły artykułów jako linki w linście
  optArticleTagsSelector = '.post-tags .list'; // lista tagów w artykule

function generateTitleLinks(){
  /* [DONE] remove contents of titleList */ // wywalić lini z lewej kolumny
  const titleList = document.querySelector(optTitleListSelector); // znajduje linki i wrzucam pustaka ''
  titleList.innerHTML = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for(let article of articles){
    const articleId = article.getAttribute('id'); // get the article id
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;   // find the title element
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; //get the title from the title element // create HTML of the link
    html = html + linkHTML;  // insert link html variable
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [IN PROGRESS] START LOOP: for every article: */
  for(let article of articles){
    const tagWrapper = article.querySelector(optArticleTagsSelector);   //find tags wrapper
    let html = ''; // make html variable with empty string
    const articleTags = article.getAttribute('data-tags'); //get tags from data-tags attribute
    const articleTagsArray = articleTags.split(' ');  //split tags into array

    /* [IN PROGRESS] START LOOP: for each tag */
      for(let tag of articleTagsArray){
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';  // generate HTML of the link
        html = html + linkHTML;  //add generated code to html variable
      } //END LOOP: for each tag

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  } //END LOOP: for every article:
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */

  /* make new constant named "clickedElement" and give it the value of "this" */

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  /* make a new constant "tag" and extract tag from the "href" constant */

  /* find all tag links with class active */

  /* START LOOP: for each active tag link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();
