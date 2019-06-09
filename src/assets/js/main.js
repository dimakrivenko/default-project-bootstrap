$(document).ready(function(){
	
	// Получения одного параметра search в URL
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

	// Маска телефона
    $("input.form-control[name=phone]").mask("+7 (999) 999-99-99");

    // Lazy load image
    const lazyLoad = new LazyLoad(document.querySelectorAll(".lazy"));
    // lazyLoad.loadImages();

    // Отправка формы
    $('.common-form').validator().on('submit', function(e) {
		var form = $(this),
            formData = form.serializeArray(),
            formName = form.find('input[name="form_name"]').val(),
            formModalSuccess = form.find('input[name="modal_success"]').val(),
			formGoal = form.find('input[name="ya_metrica_goal_name"]').val(),
			formPrivacy = form.find('input[name="privacy"]').prop("checked");

        setTimeout(function () {
            form.find('.form-group').removeClass('has-error');
        }, 3000);

        formData.push({ name: 'from_site', value: window.location.origin + window.location.pathname });

        if (getUrlParameter('utm_source') !== undefined) {
            formData.push({ name: 'utm_source', value: getUrlParameter('utm_source') });
        }

        if (getUrlParameter('utm_medium') !== undefined) {
            formData.push({ name: 'utm_medium', value: getUrlParameter('utm_medium') });
        }

        if (getUrlParameter('utm_campaign') !== undefined) {
            formData.push({ name: 'utm_campaign', value: getUrlParameter('utm_campaign') });
        }

        if (getUrlParameter('utm_content') !== undefined) {
            formData.push({ name: 'utm_content', value: getUrlParameter('utm_content') });
        }

        if (getUrlParameter('utm_term') !== undefined) {
            formData.push({ name: 'utm_term', value: getUrlParameter('utm_term') });
        }

		if (!e.isDefaultPrevented()) {
            e.preventDefault();

            if(formPrivacy) {
                form.find('.submit').addClass('is-loading').prop("disabled", true);
                $.ajax({
                    type: "POST",
                    url: './assets/php/index.php',
                    data: formData,
                    success: function(res) {
                        form.trigger('reset');
                        form.find('.submit').removeClass('is-loading').prop("disabled", false);

                        // $('.modal').modal('hide');
                        // if (formModalSuccess !== undefined && formModalSuccess !== '') {
                        //     setTimeout(function () {
                        //         $('.modal#' + formModalSuccess).modal('show');
                        //     }, 500);
                        //     setTimeout(function () {
                        //         $('.modal#' + formModalSuccess).modal('hide');
                        //     }, 5000);
                        // } else {
                            // alert('Сообщение успешно отправлено!');
                        // }

                        form.find('.info').addClass('is-success').html('Ваша заявка успешно отправлена!<br>Мы свяжемся с вами в ближайшее время.').fadeIn(200);

                        setTimeout(function() {
                        	form.find('.info').fadeOut(200);
                        }, 4000);
                        setTimeout(function() {
                        	form.find('.info').removeClass('is-success').html('');
                        }, 4200);

                        // Yandex metrika send goals
                        // const ya_metrika_id = 88888888888;

                        // if (ya_metrika_id !== null && ya_metrika_id !== undefined && ya_metrika_id !== '') {
                        //     if (formGoal !== undefined && formGoal !== '') {
                        //         ym(Number(ya_metrika_id), 'reachGoal', formGoal);
                        //     }
                        // }
                        
                    },
                    error: function(err) {
                    	console.log(err)

                    	form.trigger('reset');
                        form.find('.submit').removeClass('loading').prop("disabled", false);

                        form.find('.info').addClass('is-error').html('При отправке произошла ошибка,<br> попробуйте ещё раз.').fadeIn(200);

                        setTimeout(function() {
                        	form.find('.info').fadeOut(200);
                        }, 4000);
                        setTimeout(function() {
                        	form.find('.info').removeClass('is-error').html('');
                        }, 4200);
                    }
                });
                return false;
            } else {
                alert('Без согласия на обработку данных мы не может принять заявку');
            }
		}
	});

});


