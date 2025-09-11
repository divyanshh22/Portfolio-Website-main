$(document).ready(function () {
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');
    $('#scroll-top').toggleClass('active', window.scrollY > 60);
  });
});

document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === "visible") {
    document.title = "Projects | Portfolio Divyansh Singh";
    $("#favicon").attr("href", "../assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    $("#favicon").attr("href", "../assets/images/favhand.png");
  }
});

function getProjects() {
  return fetch("./projects.json").then(res => res.json());
}

function showProjects(projects) {
  const container = document.querySelector(".work .box-container");
  container.innerHTML = projects.map(p => `
    <div class="grid-item ${p.category}">
      <div class="box tilt">
        <img src="../assets/images/projects/${p.image}.png" alt="${p.name}" draggable="false">
        <div class="content">
          <div class="tag"><h3>${p.name}</h3></div>
          <div class="desc">
            <p>${p.desc}</p>
            <div class="btns">
              <a href="${p.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
              <a href="${p.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  const $grid = $('.box-container').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
  });
  $('.button-group').on('click', 'button', function () {
    $('.is-checked').removeClass('is-checked');
    $(this).addClass('is-checked');
    $grid.isotope({ filter: $(this).attr('data-filter') });
  });
}

getProjects().then(showProjects);

document.onkeydown = function (e) {
  if (e.keyCode === 123 ||
      (e.ctrlKey && e.shiftKey && ['I','C','J','U'].includes(String.fromCharCode(e.keyCode))) ||
      (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))) {
    return false;
  }
};


