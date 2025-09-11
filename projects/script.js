$(document).ready(function(){

  // Load projects dynamically
  $.getJSON("projects.json", function(data) {
    let html = "";
    data.forEach(proj => {
      html += `
        <div class="box ${proj.type} tilt">
          <img src="${proj.img}" alt="${proj.name}">
          <div class="content">
            <div class="tag"><h3>${proj.name}</h3></div>
            <div class="desc">
              <p>${proj.desc}</p>
              <div class="btns">
                <a href="${proj.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                <a href="${proj.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    $(".box-container").html(html);

    // Initialize isotope after content loads
    var $grid = $('.box-container').isotope({
      itemSelector: '.box',
      layoutMode: 'fitRows',
      transitionDuration: '0.6s'
    });

    // Filter buttons
    $('.button-group').on('click', 'button', function(){
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
      $('.button-group .btn').removeClass('is-checked');
      $(this).addClass('is-checked');
    });

    // Enable tilt effect
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
      max: 15,
      speed: 400
    });
  });

});


