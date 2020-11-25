'use strict';

const optArticleSelector = '.post', // zawartośc artykułu
  optTitleSelector = '.post-title', // tytuły artykułów w poście
  optTitleListSelector = '.titles', // tytuły artykułów jako linki w linście
  optArticleTagsSelector = '.post-tags .list', // lista tagów w artykule
  optArticleAuthorSelector = '.post-author', // autor w artykule
  optTagsListSelector = '.tags.list';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [Done] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
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

const generateTitleLinks = function(customSelector = ''){
  /* [DONE] remove contents of titleList */ // wywalić lini z lewej kolumny
  const titleList = document.querySelector(optTitleListSelector); // znajduje linki i wrzucam pustaka ''
  titleList.innerHTML = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

const generateTags = function(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log(allTags);

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    const tagWrapper = article.querySelector(optArticleTagsSelector);   //find tags wrapper
    let html = ''; // make html variable with empty string
    const articleTags = article.getAttribute('data-tags'); //get tags from data-tags attribute
    const articleTagsArray = articleTags.split('   ');  //split tags into array !!! pamietaj o spacji
    /* [Done] START LOOP: for each tag */

      for(let tag of articleTagsArray){
        console.log(tag);
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag  + '</a></li>';  // generate HTML of the link
        html = html + linkHTML;  //add generated code to html variable
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[linkHTML]) {
        /* [NEW] add tag to allTags object */
          allTags[linkHTML] = 1;
        } else {
          allTags[linkHTML]++;
        }
      }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let linkHTML in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += linkHTML + ' (' + allTags[linkHTML] + ') ';
  }

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}
generateTags();

const tagClickHandler = function(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', ''); // pierwsza pozycja jest wymieniona na pustaka

  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    activeTagLink.classList.remove('active'); // remove class active
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const foundTagLinks=document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */
  for(let foundTagLink of foundTagLinks){
    foundTagLink.classList.add('active'); // add class active
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

const addClickListenersToTags = function() {
  /* find all links to tags */
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for(let linkTag of linkTags){
    linkTag.addEventListener('click', tagClickHandler);// add tagClickHandler as event listener for that link
  }
}

addClickListenersToTags();

const generateAuthors = function(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);   //find author wrapper
    let html = ''; // make html variable with empty string
    const articleAuthor = article.getAttribute('data-author'); //get author from data-author attribute
    const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor  + '</a></li>';  // generate HTML of the link
    html = html + linkHTML;  //add generated code to html variable
    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = html;
  } //END LOOP: for every article:
}
generateAuthors();

const authorClickHandler = function(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', ''); // pierwsza pozycja jest wymieniona na pustaka

  /* [DONE] find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* [DONE] START LOOP: for each active author link */
  for(let activeAuthorLink of activeAuthorLinks){
    activeAuthorLink.classList.remove('active'); // remove class active
  }
  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const foundAuthorLinks=document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */
  for(let foundAuthorLink of foundAuthorLinks){
    foundAuthorLink.classList.add('active'); // add class active
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

const addClickListenersToAuthors = function() {
  const linkAuthors = document.querySelectorAll('a[href^="#author-"]');
  for(let linkAuthor of linkAuthors){
    linkAuthor.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
