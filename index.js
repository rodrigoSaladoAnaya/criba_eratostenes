let limit = 0
const searchComposed = function(atom) {
  let next = atom*atom
  let sqrt = Math.sqrt(limit);
  if(atom >= sqrt) {
    const pending = $('div[status="pending"]');
    $.each(pending, function(i, d) {
      const n = +$(d).attr("num");
      setNumAsPrime(n);
    });
    $("#findNext").html("Done!").css("background", "#fff3ab");
  }

  for(let i = next; i < limit; i+=atom) {
    setNumAsComposed(i);
  }
}

const setAtomAsPrime = function() {
  $("#n1").attr("status", 'one');
  setNumAsPrime(2);
}

const setEvensAsComposed = function() {
  for(let i = 4; i <= limit; i+=2) {
    setNumAsComposed(i);
  }
}

const setNumAsComposed = function(i) {
  $("#n"+i).addClass('composed').attr("status", 'composed');
}

const setNumAsPrime = function(i) {
  $("#n"+i).addClass('prime').attr("status", 'prime');
  $("#lastPrime").html(i);
}

const findNextPrime = function() {
  const pending_div = $('div[status="pending"]').first();
  const n = +pending_div.attr("num");
  setNumAsPrime(n);
  searchComposed(n);
}

const showNextPrimeButton = function() {
  $("#findNext").show().click(function() {
    findNextPrime();
  });
}

const go = function() {
  $("#go").click(function() {
    $("#findNext").html("Done!").css("background", "").html("Next");
    limit = +$("#limit").val();
    const container = $("#container");
    container.empty();
    const div_width = limit.toString().length * 9;
    for(let i = 1; i <= limit; i++) {
      let div = $('<div/>', {
        id: 'n' + i,
        class: 'number',
        style: 'width: '+div_width+'px;',
        status: 'pending',
        num: i,
        text: i
      });
      container.append(div);
    }
    setAtomAsPrime()
    setEvensAsComposed();
    showNextPrimeButton();
  });
}

$(document).ready(go);
