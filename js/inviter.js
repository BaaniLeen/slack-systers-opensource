$( document ).ready(function() {
  $("#invitationForm").submit(function(e) {
    e.preventDefault();

    var serialized = $("#invitationForm").serialize();
    $("#invitationForm").find("input").prop("disabled", true);

    $.ajax({
      type: 'POST',
      url: 'https://systers-os-inviter.herokuapp.com/invitations',
      data: serialized,
      success: function(result) {
        $("#invitationFormSuccess").show();
      },
      dataType: 'text'
    }).done(function(e) {
      $("#invitationFormSuccess").show();
    }).fail(function(e) {
      $("#invitationFormFail").show()
    }).always(function(e) {
       $("#invitationForm").find("input").prop("disabled", false)
    });

  });
    
});

