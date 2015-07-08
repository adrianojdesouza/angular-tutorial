angular.module('searchCep', [])
.controller('searchCepController', function($scope, $log, $http) {

    $scope.dados = {
        'cep': '',
        'logradouro': '',
        'numero': '',
        'complemento': '',
        'bairro': '',
        'cidade': '',
        'uf': ''
    };

    $scope.btnConsultaIsDisabled = true;

    /**
     * Consulta no webservice
     */
    $scope.doSearch = function() {

        var cep = $scope.dados.cep;

        // Exibindo botão de pesquisando
        $scope.shBtnPesquisando = true;
        $scope.doReset();

        var response = $http.get("http://viacep.com.br/ws/" + cep + "/json/");

        response.success(function(data, status) {

            if (typeof(data.erro) !== 'undefined') {
                alert("CEP não encontrado");
            } else {
                var dados = $scope.dados;
                dados.bairro = data.bairro;
                dados.logradouro = data.logradouro;
                dados.uf = data.uf;
                dados.cidade = data.localidade;
            }

            // Escondendo botão de pesquisando
            $scope.shBtnPesquisando = false;
        })
        .error(function(data, status) {

            alert('Erro ao consultar');
            $scope.shBtnPesquisando = false;
        });
    };

    /**
     * Reinicia os valores padrões antes da consulta
     */
    $scope.doReset = function() {
        $scope.dados.logradouro = '';
        $scope.dados.bairro = '';
        $scope.dados.cidade = '';
        $scope.dados.uf = '';
    };

    $scope.setMaskCep = function() {

        var patt = new RegExp('([0-9]{5})([0-9]{1,})');

        if (patt.test($scope.dados.cep)) {
            var tmp = $scope.dados.cep.replace(new RegExp('[^0-9]'), '');
            $scope.dados.cep = tmp.replace(patt, "$1-$2");
        }

        // Formato do cep é valido habilita o botãos
        if ((new RegExp('[0-9]{5}-[0-9]{3}')).test($scope.dados.cep)) {
            $scope.btnConsultaIsDisabled = false;
            return;
        }

        $scope.btnConsultaIsDisabled = true;
    };

});