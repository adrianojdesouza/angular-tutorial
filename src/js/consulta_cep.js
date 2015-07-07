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

    $scope.doReset = function() {
        $scope.dados.logradouro = '';
        $scope.dados.bairro = '';
        $scope.dados.cidade = '';
        $scope.dados.uf = '';
    };

});