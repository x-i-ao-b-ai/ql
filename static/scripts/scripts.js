(function () {
  var lang, loc;
  if (navigator.language === 'fr' || navigator.language === 'fr-fr') {
    lang = 'fr';
    document.title = 'Dataveyes | Interactions Homme\u2014Donn\xe9es';
  } else {
    lang = 'en';
    document.title = 'Dataveyes | Human Data Interactions';
  }
  $('body').removeClass('fr en').addClass(lang);
  loc = window.location.href;
  if (loc.indexOf('#') !== -1 && loc.indexOf('#!') === -1) {
    window.location.href = loc.replace('#', '#!');
  }
  angular.module('DataveyesApp', ['ui.router']).config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.hashPrefix('!');
      if (window.md.mobile() == null || window.md.tablet() != null) {
        $urlRouterProvider.otherwise('/').when('/', '/' + lang);
        return $stateProvider.state('home', {
          url: '/:lang',
          templateUrl: 'views/home/index.html',
          controller: 'HomeController',
          resolve: {
            resolvedContent: function (dataProvider, $stateParams) {
              return dataProvider.getHome($stateParams.lang);
            },
            resolvedMetas: function (dataProvider) {
              return dataProvider.getMetas();
            }
          }
        }).state('works', {
          url: '/:lang/works',
          templateUrl: 'views/works/index.html',
          controller: 'WorksController',
          resolve: {
            resolvedWorks: function (dataProvider, $stateParams) {
              return dataProvider.getWorks($stateParams.lang);
            },
            resolvedFeatured: function (dataProvider, $stateParams) {
              return dataProvider.getFeatured($stateParams.lang);
            },
            resolvedReferences: function (dataProvider, $stateParams) {
              return dataProvider.getReferences($stateParams.lang);
            },
            resolvedContent: function (dataProvider, $stateParams) {
              return dataProvider.getWorksContent($stateParams.lang);
            },
            resolvedWording: function (dataProvider, $stateParams) {
              return dataProvider.getWorksWording($stateParams.lang);
            },
            resolvedMetas: function (dataProvider) {
              return dataProvider.getMetas();
            }
          }
        }).state('casesstudies', {
          url: '/:lang/case-studies/:slug',
          templateUrl: 'views/works/casesstudies.html',
          controller: function ($scope, $stateParams) {
            return $scope.template = 'views/cases-studies/' + $stateParams.lang + '-' + $stateParams.slug + '.html';
          }
        }).state('projects', {
          url: '/:lang/projects/:slug',
          templateUrl: 'views/works/projects.html',
          controller: 'ProjectsController',
          resolve: {
            resolvedWorks: function (dataProvider, $stateParams) {
              return dataProvider.getWorks($stateParams.lang);
            },
            resolvedFeatured: function (dataProvider, $stateParams) {
              return dataProvider.getFeatured($stateParams.lang);
            },
            resolvedWording: function (dataProvider, $stateParams) {
              return dataProvider.getWorksWording($stateParams.lang);
            },
            resolvedMetas: function (dataProvider) {
              return dataProvider.getMetas();
            }
          }
        }).state('ressources', {
          abstract: true,
          template: '<div ui-view></div>',
          resolve: {
            resolvedMetas: function (dataProvider) {
              return dataProvider.getMetas();
            }
          }
        }).state('ressources.list', {
          url: '/:lang/ressources',
          templateUrl: 'views/ressources/index.html',
          controller: 'RessourcesController',
          resolve: {
            resolvedArticles: function (dataProvider, $stateParams) {
              return dataProvider.getArticles($stateParams.lang);
            },
            resolvedRessourcesContent: function (dataProvider, $stateParams) {
              return dataProvider.getRessourcesContent($stateParams.lang);
            },
            resolvedTalks: function (dataProvider, $stateParams) {
              return dataProvider.getTalks($stateParams.lang);
            }
          }
        }).state('ressources.details', {
          url: '/:lang/ressources/:type/:slug',
          templateUrl: 'views/ressources/details.html',
          controller: 'RessourcesDetailsController',
          resolve: {
            resolvedArticles: function (dataProvider, $stateParams) {
              return dataProvider.getArticles($stateParams.lang);
            },
            resolvedRessourcesContent: function (dataProvider, $stateParams) {
              return dataProvider.getRessourcesContent($stateParams.lang);
            },
            resolvedTalks: function (dataProvider, $stateParams) {
              return dataProvider.getTalks($stateParams.lang);
            },
            resolvedRessource: function (dataProvider, $stateParams) {
              return dataProvider.getRessource($stateParams.type, $stateParams.lang, $stateParams.slug);
            }
          }
        }).state('jobs', {
          abstract: true,
          template: '<div ui-view></div>',
          resolve: {
            resolvedMetas: function (dataProvider) {
              return dataProvider.getMetas();
            }
          }
        }).state('jobs.list', {
          url: '/:lang/jobs',
          templateUrl: 'views/jobs/index.html',
          controller: 'JobsController',
          resolve: {
            resolvedJobs: function (dataProvider, $stateParams) {
              return dataProvider.getJobs($stateParams.lang);
            }
          }
        }).state('jobs.details', {
          url: '/:lang/jobs/:slug',
          templateUrl: 'views/jobs/details.html',
          controller: 'JobsDetailsController',
          resolve: {
            resolvedJobsDetails: function (dataProvider, $stateParams) {
              return dataProvider.getJobsDetails($stateParams.lang);
            }
          }
        }).state('life', {
          url: '/:lang/life',
          templateUrl: 'views/life/index.html',
          controller: 'LifeController',
          resolve: {
            resolvedContent: function (dataProvider, $stateParams) {
              return dataProvider.getLife($stateParams.lang);
            },
            resolvedWording: function (dataProvider, $stateParams) {
              return dataProvider.getLifeWording($stateParams.lang);
            },
            resolvedMetas: function (dataProvider) {
              return dataProvider.getMetas();
            }
          }
        }).state('mentions', {
          url: '/:lang/mentions-legales',
          templateUrl: 'views/mentions/index.html',
          controller: 'MentionsController',
          resolve: {
            resolvedMentions: function (dataProvider, $stateParams) {
              return dataProvider.getMentions($stateParams.lang);
            }
          }
        }).state('error', {
          url: '/:lang/error',
          templateUrl: 'views/error/index.html',
          controller: function ($scope, $stateParams, resolvedWording) {
            $scope.lang = $stateParams.lang;
            return $scope.wording = resolvedWording.data;
          },
          resolve: {
            resolvedWording: function (dataProvider, $stateParams) {
              return dataProvider.getErrorWording($stateParams.lang);
            }
          }
        });
      } else {
        $urlRouterProvider.otherwise('/');
        return $stateProvider.state('mobile', {
          url: '/',
          templateUrl: 'views/mobile.html'
        });
      }
    }
  ]).run([
    '$rootScope',
    '$state',
    '$stateParams',
    function ($rootScope, $state, $stateParams) {
      return $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
        return $state.go('error', { lang: toParams.lang });
      });
    }
  ]);
  window.getAll = function (data, attr) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      item = data[_i];
      _results.push(item[attr]);
    }
    return _results;
  };
}.call(this));
(function () {
  angular.module('DataveyesApp').controller('IeController', [
    '$scope',
    '$stateParams',
    function ($scope, $stateParams) {
      $scope.wording = {};
      return setTimeout(function () {
        if ($stateParams.lang === 'en') {
          return $scope.wording = {
            'title': 'You are using an old browser. ',
            'sentence': 'To enjoy our work, please download a modern one.',
            'link': 'Here are some'
          };
        } else {
          return $scope.wording = {
            'title': 'Votre navigateur est tomb\xe9 en d\xe9su\xe9tude.',
            'sentence': 'Changez-en pour un plus rapide, plus fort, et surtout capable de porter le fruit de notre travail.',
            'link': 'Trouvez-en un ici.'
          };
        }
      }, 500);
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').controller('HomeController', [
    '$rootScope',
    '$scope',
    '$window',
    '$sce',
    'resolvedContent',
    'resolvedMetas',
    '$stateParams',
    '$state',
    '$location',
    function ($rootScope, $scope, $window, $sce, resolvedContent, resolvedMetas, $stateParams, $state, $location) {
      $scope.about = $sce.trustAsHtml(resolvedContent.data.about.content);
      $scope.services = $sce.trustAsHtml(resolvedContent.data.services.content);
      $scope.landing = $sce.trustAsHtml(resolvedContent.data.landing.content);
      $scope.HTMLTitle = 'Studio sp\xe9cialis\xe9 dans la visualisation de donn\xe9e interactive';
      $scope.metas = resolvedMetas.data;
      d3.select('body').classed('home', true);
      $scope.$on('$destroy', function () {
        return d3.select('body').classed('home', false);
      });
      $('body').removeClass(' fr en').addClass($stateParams.lang);
      return $('.content-services').on('click', 'li', function () {
        var location;
        location = $(this).find('a').attr('href');
        return $window.location = location;
      });
    }
  ]);
}.call(this));
(function () {
  var __indexOf = [].indexOf || function (item) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item)
          return i;
      }
      return -1;
    };
  angular.module('DataveyesApp').controller('WorksController', [
    '$scope',
    '$state',
    '$stateParams',
    '$sce',
    '$window',
    'resolvedWorks',
    'resolvedContent',
    'resolvedFeatured',
    'resolvedReferences',
    'resolvedWording',
    function ($scope, $state, $stateParams, $sce, $window, resolvedWorks, resolvedContent, resolvedFeatured, resolvedReferences, resolvedWording) {
      var activeFeaturedProjects, featuredProjects, mainTags, projects, secondaryTags, tags;
      $scope.lang = $stateParams.lang;
      $scope.wording = resolvedWording.data;
      $scope.title = 'Case studies';
      $scope.content = resolvedContent.data;
      $scope.references = _.sortBy(resolvedReferences.data, 'priority');
      $scope.tagFilter = {};
      $scope.tagFilter.tags = null;
      tags = [];
      mainTags = [];
      secondaryTags = [];
      projects = resolvedWorks.data;
      _.forEach(projects, function (project) {
        _.forEach(project.tags.slice(0, 1), function (tag) {
          return mainTags.push(tag);
        });
        return _.forEach(project.tags.slice(1), function (tag) {
          return secondaryTags.push(tag);
        });
      });
      $scope.mainTags = _.countBy(mainTags);
      $scope.secondaryTags = _.countBy(secondaryTags);
      featuredProjects = _.remove(projects, function (project) {
        var feature, _ref;
        return _ref = project.uri, __indexOf.call(function () {
          var _i, _len, _ref1, _results;
          _ref1 = resolvedFeatured.data;
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            feature = _ref1[_i];
            _results.push(feature.uri);
          }
          return _results;
        }(), _ref) >= 0;
      });
      _.forEach(featuredProjects, function (project) {
        return _.forEach(resolvedFeatured.data, function (feature) {
          if (feature.uri === project.uri) {
            project.priority = feature.priority;
            project.feature = true;
            return project.active = feature.active;
          }
        });
      });
      activeFeaturedProjects = _.filter(featuredProjects, function (project) {
        return project.active;
      });
      $scope.featured = _.sortBy(activeFeaturedProjects, 'priority');
      $scope.safeRecognitions = $sce.trustAsHtml($scope.content.recognitions.content);
      $scope.projects = _.sortBy(projects.concat(featuredProjects), function (project) {
        return new Date(project.date.released).getTime();
      }).reverse();
      $scope.isFeatured = function (project) {
        return _.contains(featuredProjects, project);
      };
      $scope.setTag = function ($event, value) {
        $event.preventDefault();
        if (value !== 'all' && value !== 'tout' && value != null) {
          return $scope.tagFilter.tags = value;
        } else {
          return $scope.tagFilter.tags = null;
        }
      };
      return $scope.goTo = function ($event) {
        var path;
        path = $($event.currentTarget).find('.button').attr('href');
        return $window.location = path;
      };
    }
  ]).controller('ProjectsController', [
    '$scope',
    '$state',
    '$stateParams',
    '$sce',
    '$window',
    'resolvedWorks',
    'resolvedFeatured',
    'resolvedWording',
    function ($scope, $state, $stateParams, $sce, $window, resolvedWorks, resolvedFeatured, resolvedWording) {
      var moreProjects, projects, projectsAvailable;
      $scope.lang = $stateParams.lang;
      $scope.wording = resolvedWording.data;
      $scope.project = _.find(resolvedWorks.data, function (project) {
        return project.uri === $stateParams.slug;
      }) || null;
      if ($scope.project !== null) {
        if (_.find(resolvedFeatured.data, function (feature) {
            return feature.uri === $stateParams.slug;
          })) {
          $state.go('error', { lang: $scope.lang });
        }
        projects = _.sortBy(resolvedWorks.data, function (project) {
          return new Date(project.date.released).getTime();
        }).reverse();
        moreProjects = _.sortBy(_.without(resolvedWorks.data, $scope.project), function (project) {
          return new Date(project.date.released).getTime();
        }).reverse();
        $scope.more = _.filter(moreProjects, function (project) {
          return project.tags[0] === $scope.project.tags[0];
        }).slice(0, 3);
        projectsAvailable = _.remove(projects, function (project) {
          var feature, _ref;
          return _ref = project.uri, __indexOf.call(function () {
            var _i, _len, _ref1, _results;
            _ref1 = resolvedFeatured.data;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              feature = _ref1[_i];
              _results.push(feature.uri);
            }
            return _results;
          }(), _ref) >= 0;
        });
        $scope.coverStyle = { 'background-image': 'url(' + $scope.project.thumbnails.cover + ')' };
        $scope.durationSentence = $scope.lang === 'fr' ? 'Un projet de ' + $scope.project.date.duration : 'A ' + $scope.project.date.duration + ' project';
        $scope.previousProject = projects[_.indexOf(projects, $scope.project) - 1];
        $scope.nextProject = projects[_.indexOf(projects, $scope.project) + 1];
        $scope.safeBaseline = $sce.trustAsHtml($scope.project.baseline);
        $scope.safeContent = $sce.trustAsHtml($scope.project.content);
        _.forEach($scope.more, function (project) {
          return _.forEach(resolvedFeatured.data, function (feature) {
            if (feature.uri === project.uri) {
              project.priority = feature.priority;
              return project.feature = true;
            }
          });
        });
        return $scope.goTo = function ($event) {
          var path;
          path = $($event.currentTarget).find('.button').attr('href');
          return $window.location = path;
        };
      } else {
        return $state.go('error', { lang: $scope.lang });
      }
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').controller('JournalCtrl', [
    '$scope',
    function ($scope) {
      return $scope.title = 'Journal';
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').controller('CareerCtrl', [
    '$scope',
    function ($scope) {
      return $scope.title = 'Career';
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').controller('LifeController', [
    '$scope',
    '$sce',
    '$location',
    '$timeout',
    '$anchorScroll',
    'resolvedContent',
    'dataProvider',
    'resolvedWording',
    '$stateParams',
    function ($scope, $sce, $location, $timeout, $anchorScroll, resolvedContent, dataProvider, resolvedWording, $stateParams) {
      var background, gallery, galleryHtml, photo, picture, s, style, ul, view, width, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      $scope.lang = $stateParams.lang;
      $scope.isImageMoving = true;
      _ref = resolvedContent.data.pictures;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        picture = _ref[_i];
        picture.img = 'content/life/pictures/' + picture.img;
      }
      _ref1 = resolvedContent.data.photos;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        photo = _ref1[_j];
        photo.img = 'content/life/gallery/' + photo.img;
      }
      $scope.header = $sce.trustAsHtml(resolvedContent.data.header.content);
      $scope.separator = $sce.trustAsHtml(resolvedContent.data.separator.content);
      $scope.pictures = resolvedContent.data.pictures;
      $scope.photos = resolvedContent.data.photos;
      $scope.wording = resolvedWording.data;
      $scope.gallery = $sce.trustAsHtml(resolvedContent.data.gallery.content);
      view = $('.life');
      background = view.find('.background');
      ul = view.find('ul');
      $('body').scrollTop(0);
      gallery = view.find('.gallery ul');
      width = $(window).width();
      style = 'style="width:' + width / 4 + 'px;height:' + width / 4 + 'px"';
      galleryHtml = '';
      _ref2 = $scope.photos;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        photo = _ref2[_k];
        galleryHtml += '<li ><img src="' + photo.img + '"/></li>';
      }
      gallery.find('li:first-child').css({ height: width / 4 });
      gallery.append(galleryHtml);
      $(window).on('resize', function () {
        width = $(window).width() / 4;
        return gallery.find('li:first-child').css({ 'height': width });
      });
      s = null;
      if (window.md.tablet() === null) {
        $scope.$on('team:last', function () {
          window.skrollrStylesheets.refresh();
          return s = skrollr.init();
        });
      }
      $scope.$on('$destroy', function () {
        return s.destroy();
      });
      $location.hash('menu-top');
      $anchorScroll();
      $scope.graph = new DATAVEYES.Logo(d3.select('.grid .background'));
      dataProvider.getLogo().then(function (data) {
        var obj;
        obj = $scope.graph.attr('partialRange');
        obj.start = 499;
        obj.end = 0;
        obj.max = 499;
        obj.count = 499;
        obj.base = 499;
        obj.addTimer = 0;
        obj.comminTimer = 0;
        obj.leavinTimer = 0;
        obj.first = true;
        $scope.graph.attr('data', data.data).update().attr('partialRange', obj).attr('innerRadius', 80).attr('outterRadius', 280).attr('lastColor', {
          sr: 244,
          sg: 195,
          sb: 30,
          er: 0,
          eg: 189,
          eb: 204
        }).attr('width', 720).attr('height', 720).attr('innerRadius', 120).attr('outterRadius', 360).attr('layout', 'dancingLayout').update();
        $scope.graph.attr('layout', 'partialCircular').update();
        setTimeout(function () {
          return $scope.graph.attr('anim', false);
        }, 3000);
      });
      $scope.mouseEnter = function ($event, obj) {
        if (obj.user !== '@Benoit' && obj.user !== '@Fx') {
          $scope.graph.team(obj.user);
          background.addClass('hover');
          ul.addClass('hover');
        }
        $($event.currentTarget.parentNode).addClass('hover');
        return this;
      };
      $scope.mouseLeave = function ($event) {
        $scope.graph.team(null);
        $('.life').find('li').removeClass('hover');
        background.removeClass('hover');
        ul.removeClass('hover');
        return this;
      };
      return $scope.setColor = function (color) {
        return { 'background-color': color };
      };
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').controller('JobsController', [
    '$scope',
    'resolvedJobs',
    '$sce',
    function ($scope, resolvedJobs, $sce) {
      return $scope.content = $sce.trustAsHtml(resolvedJobs.data.index.content);
    }
  ]).controller('JobsDetailsController', [
    '$scope',
    '$state',
    'resolvedJobsDetails',
    '$sce',
    '$stateParams',
    function ($scope, $state, resolvedJobsDetails, $sce, $stateParams) {
      var content;
      content = resolvedJobsDetails.data[$stateParams.slug] || null;
      if (content !== null) {
        $scope.content = $sce.trustAsHtml(resolvedJobsDetails.data[$stateParams.slug].content);
        return $scope.title = 'Job item';
      } else {
        return $state.go('error', { lang: $stateParams.lang });
      }
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').controller('FooterController', [
    '$scope',
    'dataProvider',
    '$stateParams',
    '$state',
    function ($scope, dataProvider, $stateParams, $state) {
      $scope.lang = $stateParams.lang;
      $scope.$on('$stateChangeSuccess', function (value) {
        $scope.lang = $stateParams.lang;
        return dataProvider.getFooter($stateParams.lang).then(function (res) {
          return $scope.content = res.data;
        });
      });
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').controller('RessourcesController', [
    '$scope',
    '$state',
    '$sce',
    'resolvedArticles',
    'resolvedTalks',
    'resolvedRessourcesContent',
    '$stateParams',
    function ($scope, $state, $sce, resolvedArticles, resolvedTalks, resolvedRessourcesContent, $stateParams) {
      $scope.wording = resolvedRessourcesContent.data;
      $scope.lang = $stateParams.lang;
      $scope.articles = _.sortBy(resolvedArticles.data, function (article) {
        return new Date(article.date.released).getTime();
      }).reverse();
      $scope.talks = _.sortBy(resolvedTalks.data, function (talk) {
        return new Date(talk.date.released).getTime();
      }).reverse();
      $scope.mainSubTitle = $sce.trustAsHtml($scope.wording.mainSubTitle);
      return $scope.goTo = function (state, params) {
        return $state.go(state, params);
      };
    }
  ]).controller('RessourcesDetailsController', [
    '$scope',
    '$rootScope',
    '$sce',
    'resolvedRessource',
    'resolvedArticles',
    'resolvedTalks',
    'resolvedRessourcesContent',
    '$stateParams',
    function ($scope, $rootScope, $sce, resolvedRessource, resolvedArticles, resolvedTalks, resolvedRessourcesContent, $stateParams) {
      $scope.ressource = resolvedRessource.data;
      $scope.wording = resolvedRessourcesContent.data;
      $scope.lang = $stateParams.lang;
      $scope.safeContent = $sce.trustAsHtml($scope.ressource.content);
      $scope.safeDate = $sce.trustAsHtml($scope.ressource.date.start);
      $scope.coverStyle = { 'background-image': 'url(' + $scope.ressource.thumbnails.cover + ')' };
      $scope.authorSrc = $scope.ressource.author.toLowerCase().split(/[ ,-]+/).join('-');
      if ($scope.ressource.type === 'talk') {
        return $scope.others = _.sortBy(_.filter(resolvedTalks.data, function (ressource) {
          return ressource.uri !== $scope.ressource.uri;
        }), function (article) {
          return new Date(article.date.released).getTime();
        }).reverse();
      } else {
        return $scope.others = _.sortBy(_.filter(resolvedArticles.data, function (ressource) {
          return ressource.uri !== $scope.ressource.uri;
        }), function (article) {
          return new Date(article.date.released).getTime();
        }).reverse();
      }
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').controller('ContactController', [
    '$scope',
    'dataProvider',
    '$stateParams',
    '$sce',
    '$location',
    function ($scope, dataProvider, $stateParams, $sce, $location) {
      var $container, $content;
      $container = $('.contact-container');
      $content = $container.children('.content');
      $scope.$on('menu:toogle', function () {
        return dataProvider.getContact($stateParams.lang).then(function (res) {
          $scope.content = res.data;
          $scope.content.address = $sce.trustAsHtml($scope.content.address);
          return $scope.open();
        });
      });
      $scope.$on('menu:close', function () {
        return $scope.close();
      });
      $scope.openLink = function (item) {
        if (item.natural) {
          window.location.href = item.link;
        } else {
          $location.path(item.link);
        }
        return $scope.close();
      };
      $scope.close = function () {
        $('.header-container .header, .container-ui-view, .footer').removeAttr('style');
        $content.removeClass('show');
        setTimeout(function () {
          return $container.removeClass('show');
        }, 500);
        return true;
      };
      $scope.open = function () {
        if ($container.is(':visible')) {
          $scope.close();
        } else {
          $('.header-container .header, .container-ui-view, .footer').css({
            '-webkit-filter': 'blur(3px)',
            'filter': 'blur(3px)'
          });
          $container.addClass('show');
          setTimeout(function () {
            return $content.addClass('show');
          }, 500);
          $container.on('click', function (e) {
            if (e.currentTarget === e.target) {
              return $scope.close();
            }
          });
        }
      };
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').controller('MentionsController', [
    '$scope',
    'resolvedMentions',
    '$sce',
    function ($scope, resolvedMentions, $sce) {
      $scope.mentions = resolvedMentions.data.mentions;
      return $scope.safeContent = $sce.trustAsHtml($scope.mentions.content);
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').factory('dataProvider', [
    '$http',
    function ($http) {
      return {
        getMetas: function () {
          return $http.get('./data/metas.json', { cache: true });
        },
        getMenu: function (lang) {
          return $http.get('./data/menu/' + lang + '-wording.json', { cache: true });
        },
        getContact: function (lang) {
          return $http.get('./data/contact/' + lang + '-wording.json', { cache: true });
        },
        getHome: function (lang) {
          return $http.get('./data/home/' + lang + '-content.json', { cache: true });
        },
        getWorks: function (lang) {
          return $http.get('./data/case-studies/' + lang + '-list.json', { cache: true });
        },
        getWorksContent: function (lang) {
          return $http.get('./data/case-studies/' + lang + '-content.json', { cache: true });
        },
        getWorksWording: function (lang) {
          return $http.get('./data/case-studies/' + lang + '-wording.json', { cache: true });
        },
        getFeatured: function (lang) {
          return $http.get('./data/case-studies/' + lang + '-featured.json', { cache: true });
        },
        getReferences: function (lang) {
          return $http.get('./data/case-studies/' + lang + '-references.json', { cache: true });
        },
        getLife: function (lang) {
          return $http.get('./data/life/' + lang + '-content.json', { cache: true });
        },
        getLifeWording: function (lang) {
          return $http.get('./data/life/' + lang + '-wording.json', { cache: true });
        },
        getLogo: function () {
          return $http.get('./data/logo/result.json', { cache: true });
        },
        getArticles: function (lang) {
          return $http.get('./data/ressources/articles/' + lang + '-list.json', { cache: true });
        },
        getRessource: function (type, lang, slug) {
          return $http.get('./data/ressources/content/' + type + 's/' + lang + '/' + slug + '.json', { cache: true });
        },
        getRessourcesContent: function (lang) {
          return $http.get('./data/ressources/' + lang + '-wording.json', { cache: true });
        },
        getTalks: function (lang) {
          return $http.get('./data/ressources/talks/' + lang + '-list.json', { cache: true });
        },
        getFooter: function (lang) {
          return $http.get('./data/footer/' + lang + '-wording.json', { cache: true });
        },
        getJobs: function (lang) {
          return $http.get('./data/jobs/index/' + lang + '-content.json', { cache: true });
        },
        getJobsDetails: function (lang) {
          return $http.get('./data/jobs/details/' + lang + '-content.json', { cache: true });
        },
        getMentions: function (lang) {
          return $http.get('./data/legal/' + lang + '-content.json', { cache: true });
        },
        getErrorWording: function (lang) {
          return $http.get('./data/error/' + lang + '-wording.json', { cache: true });
        }
      };
    }
  ]);
}.call(this));
(function () {
  var initScoll, removeScroll, updateContent, _rootScope, _scope;
  _scope = null;
  _rootScope = null;
  angular.module('DataveyesApp').directive('landingManager', [
    '$rootScope',
    'dataProvider',
    '$compile',
    function ($rootScope, dataProvider, $compile) {
      return {
        restrict: 'A',
        replace: false,
        template: '<div class=\'logoContainer\' ng-style=\'containerStyle\'>                        <div class=\'content content-logo\'></div>                  </div>',
        scope: { config: '=' },
        link: function (scope, element, attrs) {
          var clearTimers, layouts, layoutsCount, startLoader, steps, swicthListContent;
          scope.cleanLastLayoutEvent = $rootScope.$on('home:lastLayout', function (value) {
            _scope.skip();
            $('html, body').animate({ scrollTop: window.innerHeight }, 750 / 1083 * window.innerHeight);
            $('.content-logo').fadeOut();
            $('.control').fadeOut();
          });
          d3.selectAll('.control > div').on('mouseover', function () {
            return d3.select(this).selectAll('img').transition().duration(350).style('opacity', 0.8);
          }).on('mouseout', function () {
            return d3.select(this).selectAll('img').transition().duration(350).style('opacity', 0.2);
          });
          _scope = scope;
          _rootScope = $rootScope;
          window._rootScope = _rootScope;
          scope.graph = new DATAVEYES.Logo(d3.select('.logoContainer'));
          scope.loader = new DATAVEYES.Loader(d3.select('#counter'));
          scope.timers = [];
          scope.layoutCount = 0;
          scope.skipActive = false;
          scope.scrollEnable = true;
          scope.wait = false;
          scope.loader.update(0);
          $(window).scrollTop(0);
          scope.containerStyle = { height: '' + window.innerHeight + 'px' };
          d3.select('.void-content').style('height', '' + window.innerHeight + 'px');
          $(window).resize(function () {
            scope.graph.resize();
            scope.$apply(function () {
              return scope.containerStyle = { height: '' + window.innerHeight + 'px' };
            });
            d3.select('.void-content').style('height', '' + window.innerHeight + 'px');
            d3.select('.scroll-feedback').each(function () {
              var elem, height;
              elem = d3.select(this);
              height = $(elem.node()).height();
              return elem.style({ top: '' + (window.innerHeight / 2 - height / 2) + 'px' });
            });
          });
          document.onkeydown = function (e) {
            if (e.keyCode === 38) {
              scope.changeState(-1);
              e.preventDefault();
            } else if (e.keyCode === 40) {
              scope.changeState(+1);
              e.preventDefault();
            }
          };
          $('body').addClass('js-hidden');
          $('html').addClass('js-hidden');
          initScoll(scope);
          clearTimers = function () {
            var timer, _i, _len, _ref;
            _ref = scope.timers;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              timer = _ref[_i];
              clearInterval(timer);
              clearTimeout(timer);
            }
            TWEEN.removeAll();
          };
          startLoader = function (duration) {
            var count;
            count = {
              state: 0,
              alpha: 0.4
            };
            scope.loader.update(0, 0.4);
            new TWEEN.Tween(count).to({
              state: 0,
              alpha: 0.4
            }, duration + 2000).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
              return scope.loader.update(count.state, count.alpha);
            }).onComplete(function () {
              scope.timers.push(setTimeout(function () {
                return d3.select('.next').classed('highlight', true);
              }, 200));
              return new TWEEN.Tween(count).easing(TWEEN.Easing.Bounce.In).to({ alpha: 1 }, 500).onUpdate(function () {
                scope.loader.update(count.state, count.alpha);
              }).start();
            }).start();
          };
          swicthListContent = function (duration) {
            var height, index, nbrElement, translate, _i;
            if (duration == null) {
              duration = [
                0,
                3000,
                5500
              ];
            }
            d3.selectAll('.sentence .list li').classed('hidden', true);
            nbrElement = angular.element('.sentence .list li').length;
            height = angular.element('.sentence .list li').height();
            translate = function (index) {
              scope.timers.push(setTimeout(function () {
                var width;
                if (index !== 0) {
                  width = angular.element('.sentence li:eq(' + index + ')').width();
                  d3.selectAll('.sentence .list').transition().duration(900).ease('exp-in-out').style('width', '' + (width + 3) + 'px');
                } else {
                }
                d3.selectAll('.sentence .list ul').transition().duration(850).ease('exp-in-out').style('top', '' + (25 - height * (index + 1)) + 'px');
                d3.selectAll('.sentence .list li').transition().duration(850).ease('exp-in-out').style('opacity', 0);
                return d3.selectAll('.sentence .list li').filter(function (d, i) {
                  return i === index;
                }).transition().duration(850).ease('exp-in-out').style('opacity', 1);
              }, duration[index]));
            };
            for (index = _i = 0; 0 <= nbrElement ? _i < nbrElement : _i > nbrElement; index = 0 <= nbrElement ? ++_i : --_i) {
              translate(index);
            }
          };
          scope.$on('$destroy', function () {
            $('body').removeClass('js-hidden');
            $('html').removeClass('js-hidden');
            scope.graph.destroy();
            scope.cleanLastLayoutEvent();
            removeScroll();
            clearTimers();
            $(window).off('resize');
            $(window).off('mousewheel');
            setTimeout(function () {
              return delete scope.graph;
            }, 16);
          });
          scope.steps = [];
          layouts = [
            {
              name: 'dancingLayout',
              backgroundColor: '#0c0e13',
              content: '<div class=\'dv-logo sentence\'> ' + scope.$parent['this'].landing.toString() + ' </div>',
              duration: 0,
              onload: function () {
                $rootScope.$broadcast('menu:hamburger', false);
                $(window).scrollTop(0);
                $('body').addClass('js-hidden');
                $('html').addClass('js-hidden');
              }
            },
            {
              name: 'forceLayout',
              backgroundColor: '#0e1117',
              duration: 5500,
              content: '                        <div class="sentence first">                            <span class="chaparral">                                We help people                            </span>                            <div class="list clearfix">                                <ul style="top:-45px">                                    <li class="euclid"> understand </li>                                    <li class="euclid"> share </li>                                    <li class="euclid"> operate </li>                                </ul>                            </div>                            <span class="chaparral">                                their data.                            </span>                        </div>',
              onload: function () {
                $rootScope.$broadcast('menu:hamburger', true);
                d3.select('.next').classed('labeled', false);
                d3.select('.skip').classed('labeled', false);
                clearTimers();
                TWEEN.removeAll();
                swicthListContent([
                  0,
                  3000,
                  5500
                ]);
                startLoader(4800);
              }
            },
            {
              name: 'forceLayoutLinked',
              backgroundColor: '#10131a',
              content: '                        <div class="sentence second">                            <span class="euclid">                                We connect users to data                            </span>                            <span class="chaparral">                                through useful and relevant interfaces.                            </span>                        </div>',
              duration: 2800,
              onload: function () {
                $rootScope.$broadcast('menu:hamburger', true);
                clearTimers();
                TWEEN.removeAll();
                startLoader(2800);
              }
            },
            {
              name: 'partialCircular',
              backgroundColor: '#12161d',
              content: '                        <div class="sentence third">                            <span class="chaparral">                                That\u2019s how                            </span>                            <div class="list clearfix">                                <ul style="top:-45px">                                    <li class="euclid"> we translate data into experiences </li>                                    <li class="euclid"> we tell stories from data </li>                                    <li class="euclid"> we support new uses of data </li>                                </ul>                            </div>                        </div>',
              duration: 6000,
              onload: function () {
                var t;
                $rootScope.$broadcast('menu:hamburger', true);
                clearTimers();
                t = [
                  0,
                  3000,
                  6000
                ];
                swicthListContent(t);
                scope.graph.attr('lastMaxPartial', 30);
                scope.graph.attr('partialRange', {
                  max: 120,
                  add: 2,
                  count: 40,
                  start: 0,
                  end: 0,
                  base: 40,
                  addTimer: 2200,
                  comminTimer: 2200,
                  leavinTimer: 2200,
                  reused: false,
                  onLoop: function () {
                    var obj;
                    obj = scope.graph.attr('partialRange');
                    new TWEEN.Tween(obj).to({
                      addTimer: 700,
                      comminTimer: 700,
                      leavinTimer: 700
                    }, 1500).onUpdate(function () {
                      return scope.graph.attr('partialRange', obj);
                    }).start();
                  }
                });
                scope.graph.attr('innerRadius', 50);
                scope.graph.attr('outterRadius', 50);
                scope.timers.push(setTimeout(function () {
                  var add, obj, param;
                  startLoader(6000);
                  obj = scope.graph.attr('partialRange');
                  obj.addTimer = 200;
                  obj.comminTimer = 200;
                  obj.leavinTimer = 800;
                  scope.graph.attr('partialRange', obj);
                  obj = scope.graph.attr('partialRange');
                  add = 0;
                  new TWEEN.Tween(obj).to({
                    addTimer: 100,
                    comminTimer: 90,
                    leavinTimer: 90
                  }, 6000).onUpdate(function () {
                    return scope.graph.attr('partialRange', obj);
                  }).start();
                  param = {
                    innerRadius: scope.graph.attr('innerRadius'),
                    outterRadius: scope.graph.attr('outterRadius')
                  };
                  return new TWEEN.Tween(param).easing(TWEEN.Easing.Exponential.InOut).to({
                    innerRadius: 25,
                    outterRadius: 180
                  }, 10000).onUpdate(function () {
                    scope.graph.attr('innerRadius', param.innerRadius);
                    return scope.graph.attr('outterRadius', param.outterRadius);
                  }).start();
                }, 5));
              }
            },
            {
              name: 'partialCircular',
              backgroundColor: '#151921',
              content: '                        <div class="sentence fourth">                            <div class="chaparral">                                Ultimately                            </div>                            <div class="euclid">                                that\u2019s how we make sense <br/>of a world increasingly shaped <br/>by algorithms.                            </div>                        </div>',
              duration: 4000,
              onload: function () {
                var obj, reused;
                $rootScope.$broadcast('menu:hamburger', true);
                obj = scope.graph.attr('partialRange');
                obj.max = 200;
                reused = true;
                obj.base = obj.count;
                clearTimers();
                scope.graph.attr('partialRange', obj);
                scope.timers.push(setTimeout(function () {
                  var radius, speed;
                  startLoader(4000);
                  obj = scope.graph.attr('partialRange');
                  speed = 100;
                  new TWEEN.Tween(obj).to({
                    addTimer: speed,
                    comminTimer: speed - 10,
                    leavinTimer: speed - 10
                  }, 1200).onUpdate(function () {
                    return scope.graph.attr('partialRange', obj);
                  }).start();
                  radius = {
                    innerRadius: scope.graph.attr('innerRadius'),
                    outterRadius: scope.graph.attr('outterRadius')
                  };
                  return new TWEEN.Tween(radius).to({
                    innerRadius: 0,
                    outterRadius: 550
                  }, 15000).easing(TWEEN.Easing.Exponential.Out).onUpdate(function () {
                    scope.graph.attr('innerRadius', radius.innerRadius);
                    return scope.graph.attr('outterRadius', radius.outterRadius);
                  }).start();
                }, 20));
              }
            },
            {
              name: 'partialCircular',
              backgroundColor: '#171b25',
              content: '                        <div class="sentence fifth">                            <div class="chaparral">                                The upcoming era of rich data <br>will disrupt the way data is used.                            </div>                            <div class="euclid">                                We are taking an active part in <br>the revolution of Human-Data Interactions.                            </div>                        </div>',
              duration: 4000,
              onload: function () {
                var obj, reused;
                $rootScope.$broadcast('menu:hamburger', true);
                obj = scope.graph.attr('partialRange');
                obj.max = 499;
                reused = true;
                obj.base = obj.count;
                scope.graph.attr('partialRange', obj);
                clearTimers();
                scope.timers.push(setTimeout(function () {
                  var radius, speed;
                  startLoader(4000);
                  obj = scope.graph.attr('partialRange');
                  speed = 100;
                  new TWEEN.Tween(obj).to({
                    addTimer: speed,
                    comminTimer: speed - 10,
                    leavinTimer: speed - 10
                  }, 1500).onUpdate(function () {
                    return scope.graph.attr('partialRange', obj);
                  }).start();
                  radius = {
                    innerRadius: scope.graph.attr('innerRadius'),
                    outterRadius: scope.graph.attr('outterRadius')
                  };
                  return new TWEEN.Tween(radius).to({
                    innerRadius: 350,
                    outterRadius: 950
                  }, 13000).easing(TWEEN.Easing.Exponential.Out).onUpdate(function () {
                    scope.graph.attr('innerRadius', radius.innerRadius);
                    return scope.graph.attr('outterRadius', radius.outterRadius);
                  }).start();
                }, 20));
              }
            },
            {
              name: 'partialCircular',
              backgroundColor: '#191e28',
              data: 600,
              content: '<div class=\'dv-logo sentence sixth cropped\'></div>',
              duration: 2800,
              onload: function () {
                var obj, radius;
                $rootScope.$broadcast('menu:hamburger', true);
                $('.header').addClass('last-layout');
                obj = _scope.graph.attr('partialRange');
                $('.scroll-feedback').fadeOut();
                clearTimers();
                _scope.timers.push(setTimeout(function () {
                  startLoader(2800);
                }, 20));
                obj.onload = function () {
                  obj.add = 1;
                };
                obj.max = 499;
                obj.base = obj.count;
                if (!_scope.skipActive) {
                  obj.addTimer = 50;
                  obj.comminTimer = 50;
                  obj.leavinTimer = 50;
                }
                _scope.graph.attr('partialRange', obj);
                radius = {
                  innerRadius: _scope.graph.attr('innerRadius'),
                  outterRadius: _scope.graph.attr('outterRadius')
                };
                _scope.timers.push(setTimeout(function () {
                  var durationA, durationB;
                  durationB = 3000;
                  durationA = durationB - 300;
                  new TWEEN.Tween(obj).to({
                    addTimer: 520,
                    comminTimer: 520 - 10,
                    leavinTimer: 520 - 10
                  }, 1200).delay(durationB).onUpdate(function () {
                    return _scope.graph.attr('partialRange', obj);
                  }).start();
                  if (_scope.skipActive) {
                    durationA = durationB = 0;
                  }
                  new TWEEN.Tween(radius).to({ innerRadius: 80 }, durationA).easing(TWEEN.Easing.Back.InOut).onUpdate(function () {
                    return _scope.graph.attr('innerRadius', radius.innerRadius);
                  }).start();
                  return new TWEEN.Tween(radius).to({ outterRadius: 260 }, durationB).easing(TWEEN.Easing.Back.InOut).onUpdate(function () {
                    return _scope.graph.attr('outterRadius', radius.outterRadius);
                  }).start();
                }, 20));
                _scope.scrollEnable = false;
                d3.select('.control').classed('nextOnly', true).transition().duration(650).style('margin-left', '-30px');
                d3.select('.control').selectAll('.skip').transition().duration(650).style('opacity', 0);
                setTimeout(function () {
                  $('body').removeClass('js-hidden');
                  $('html').removeClass('js-hidden');
                }, 3000);
                d3.select('.landing').style('z-index', 1);
              }
            }
          ];
          d3.select('.scroll-feedback').each(function () {
            var elem, height;
            elem = d3.select(this);
            height = $(elem.node()).height();
            return elem.style({ top: '' + (window.innerHeight / 2 - height / 2) + 'px' });
          });
          steps = d3.select('.scroll-feedback').selectAll('div').data(layouts);
          steps.enter().append('div');
          steps.each(function (d, i) {
            var elem;
            elem = d3.select(this);
            return d.stepInit = function () {
              d3.selectAll('.scroll-feedback div').classed('active', false);
              elem.classed('active', true);
            };
          });
          scope.layouts = layouts;
          layoutsCount = 0;
          scope.layout = layouts[layoutsCount];
          updateContent(scope.layout.content);
          dataProvider.getLogo().then(function (data) {
            return scope.graph.attr('data', data.data.splice(0, 500)).attr('layout', layouts[layoutsCount].name).update();
          });
          scope.changeState = function (value) {
            if (!scope.scrollEnable) {
              return false;
            }
            if (!scope.wait) {
              if (layoutsCount === 0 && layoutsCount + value < 0) {
                return;
              }
              scope.wait = true;
              $(window).scrollTop(0);
              $('.next').removeClass('highlight');
              layoutsCount += value;
              if (layoutsCount > layouts.length - 1) {
                layoutsCount = 0;
              } else if (layoutsCount < 0) {
                layoutsCount = 0;
              }
              scope.layoutCount = layoutsCount;
              scope.layout = layouts[layoutsCount];
              updateContent(scope.layout.content);
              d3.select('.logoContainer').style('background-color', scope.layout.backgroundColor);
              if (scope.layout.onload != null) {
                scope.layout.onload();
              }
              if (scope.layout.stepInit != null) {
                scope.layout.stepInit();
              }
              scope.graph.attr('layout', scope.layout.name).update();
              scope.timers.push(setTimeout(function () {
                scope.wait = false;
                return $('.next').addClass('highlight');
              }, scope.layout.duration));
            }
          };
          scope.changeState(0);
        }
      };
    }
  ]);
  updateContent = function (content) {
    var count, last, width;
    angular.element('.content-logo').append(content);
    count = d3.selectAll('.content-logo > div')[0].length;
    last = [];
    if (count > 2) {
      last = d3.selectAll('.content-logo > div')[0].reverse().slice(0, 2);
    }
    d3.selectAll('.content-logo > div').each(function (d, i) {
      var delay, duration, _this = this;
      if (!_scope.skipActive) {
        if (i === 0 && count > 1 && count <= 2) {
          d3.select(this).transition().duration(850).ease('exp-in-out').style('margin-top', '' + -140 + 'px').style('opacity', 0).each('end', function () {
            return d3.select(this).remove();
          });
        } else if (count > 1 && count <= 2) {
          if (_scope.layoutCount === 5) {
            setTimeout(function () {
              d3.select(_this).transition().duration(850).ease('exp-in-out').style('margin-top', '' + -40 + 'px').style('opacity', 1).transition().duration(1250).delay(3000).style('margin-top', '' + -100 + 'px');
              d3.select(_this).selectAll('div').filter(function (d, i) {
                return i === 0;
              }).transition().duration(1250).delay(3000).ease('exp-in-out').style('font-size', '' + 28 + 'px');
              return d3.select(_this).selectAll('div').filter(function (d, i) {
                return i === 1;
              }).transition().duration(1250).delay(3000).ease('exp-in-out').style('margin-top', '' + -130 + 'px').style('opacity', 1);
            }, 100);
          } else if (_scope.layoutCount === _scope.layouts.length - 1) {
            setTimeout(function () {
              var delay, duration;
              duration = 2500;
              delay = 3000;
              if (_scope.skipActive) {
                duration = 1500;
                delay = 1500;
              }
              return d3.select(_this).transition().duration(duration).delay(delay).ease('exp-in-out').style('margin-top', '' + -20 + 'px').style('opacity', 1);
            }, 100);
          } else {
            setTimeout(function () {
              return d3.select(_this).transition().duration(850).ease('exp-in-out').style('margin-top', '' + -20 + 'px').style('opacity', 1);
            }, 100);
          }
        } else if (count === 1) {
          d3.select(this).transition().duration(850).ease('exp-in-out').style('margin-top', '' + -20 + 'px').style('opacity', 1);
        }
      } else {
        if (d3.select(this).attr('class').indexOf('sixth') >= 0) {
          duration = 1500;
          delay = 1500;
          d3.select(this).transition().duration(duration).delay(delay).ease('exp-in-out').style('margin-top', '' + -20 + 'px').style('opacity', 1);
        } else {
          d3.select(this).transition().duration(850).ease('exp-in-out').style('margin-top', '' + -140 + 'px').style('opacity', 0).each('end', function () {
            return d3.select(this).remove();
          });
        }
      }
    });
    width = angular.element('.sentence li:eq(0)').width();
    angular.element('.sentence ul').width('' + width + 'px');
  };
  initScoll = function (scope) {
    var changeState, max, state;
    max = window.innerHeight;
    state = 0;
    changeState = function (index) {
      scope.changeState(index);
    };
    $(window).on('mousewheel DOMMouseScroll', function (event) {
      var value;
      value = event.originalEvent.wheelDelta;
      if (value == null) {
        value = event.originalEvent.detail * -40;
      }
      state -= value;
      angular.element('.handler').css({ height: '' + state / max * 100 + '%' });
      if (state > max) {
        changeState(1);
        state = 0;
      } else if (state < 0) {
        changeState(-1);
        state = max;
      }
      if ($(window).scrollTop() > window.innerHeight / 2) {
        $('.content-logo').fadeOut();
        scope.graph.attr('anim', false);
      } else {
        $('.content-logo').fadeIn();
        scope.graph.attr('anim', true);
      }
      if ($(window).scrollTop() < 30) {
        $('.control').fadeIn();
      } else {
        $('.control').fadeOut();
      }
    });
    scope.skip = function () {
      var obj;
      if (_scope.layoutCount !== _scope.layouts.length - 1) {
        d3.select('.next').classed('labeled', false);
        d3.select('.skip').classed('labeled', false);
        _rootScope.$broadcast('menu:hamburger', true);
        $('.control').fadeIn();
        obj = scope.graph.attr('partialRange');
        obj.start = 499;
        obj.end = 0;
        obj.max = 499;
        obj.count = 499;
        obj.base = 499;
        obj.addTimer = 10250;
        obj.comminTimer = 1250 - 10;
        obj.leavinTimer = 1250 - 10;
        obj.first = true;
        obj.easing = true;
        scope.skipActive = true;
        scope.graph.attr('partialRange', obj).attr('innerRadius', 80).attr('outterRadius', 280).attr('lastColor', {
          sr: 244,
          sg: 195,
          sb: 30,
          er: 0,
          eg: 189,
          eb: 204
        }).attr('layout', 'forceLayout');
        scope.changeState(scope.layouts.length - scope.layoutCount - 1);
      }
    };
    d3.select('.skip').on('click', scope.skip);
    scope.next = function () {
      if (!d3.select('.control').classed('nextOnly')) {
        d3.select('.next').classed('highlight', false);
        scope.changeState(1);
      } else {
        $('html, body').animate({ scrollTop: window.innerHeight }, 750 / 1083 * window.innerHeight);
        $('.content-logo').fadeOut();
        $('.control').fadeOut();
      }
    };
    d3.select('.next').on('click', scope.next);
  };
  removeScroll = function () {
    $(window).off('mousewheel');
  };
}.call(this));
(function () {
  angular.module('DataveyesApp').directive('header', [
    '$rootScope',
    '$state',
    '$stateParams',
    '$timeout',
    'dataProvider',
    '$location',
    function ($rootScope, $state, $stateParams, $timeout, dataProvider, $location) {
      return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attributes) {
          var setBackable;
          scope.isAbout = $state.current.name === 'home' ? true : false;
          scope.hamburger = false;
          scope.backable = false;
          $timeout(function () {
            return $('html, body').scrollTop(0);
          });
          scope.$safeApply = function (fn) {
            var phase;
            phase = this.$root.$$phase;
            if (phase === '$apply' || phase === '$digest') {
              if (fn != null && typeof fn === 'function') {
                fn();
              }
            } else {
              this.$apply(fn);
            }
          };
          scope.toggleMenu = function ($event) {
            $event.preventDefault();
            scope.hamburger = false;
            ga('send', 'event', 'button', 'click', 'Show full menu');
            return scope.big = true;
          };
          $rootScope.$on('$stateChangeSuccess', function () {
            scope.isAbout = $state.current.name === 'home' ? true : false;
            ga('send', 'pageview', { 'page': $location.path() });
            setBackable();
            return $timeout(function () {
              return $('html, body').scrollTop(-56);
            }, 100);
          });
          scope.$on('menu:hamburger', function ($event, value) {
            return scope.$safeApply(function () {
              return scope.hamburger = value;
            });
          });
          $(window).on('scroll', function () {
            var top;
            top = $(this).scrollTop();
            if (top > 300) {
              return scope.$apply(function () {
                scope.backLabel = $stateParams.lang === 'fr' ? 'Retour \xe0 la liste' : 'Back to list';
                return scope.hamburger = true;
              });
            } else {
              return scope.$apply(function () {
                scope.hamburger = false;
                return scope.big = false;
              });
            }
          });
          setBackable = function () {
            scope.$safeApply(function () {
              return scope.lang = $stateParams.lang;
            });
            switch ($state.current.name) {
            case 'casesstudies':
            case 'projects':
              scope.backable = true;
              return scope.href = $state.href('works', { lang: $stateParams.lang });
            case 'ressources.details':
              scope.backable = true;
              return scope.href = $state.href('ressources.list', { lang: $stateParams.lang });
            default:
              return scope.backable = false;
            }
          };
          setBackable();
          scope.makeItBig = function ($event) {
            return scope.big = true;
          };
          return scope.makeItSmall = function ($event) {
            return scope.big = false;
          };
        }
      };
    }
  ]).directive('menu', [
    '$rootScope',
    '$state',
    '$stateParams',
    'dataProvider',
    function ($rootScope, $state, $stateParams, dataProvider) {
      return {
        restrict: 'A',
        replace: false,
        templateUrl: './views/menu.html',
        scope: { config: '=' },
        link: function (scope, elm, attrs) {
          var setSelected, update;
          scope.isAbout = $state.current.name === 'home' ? true : false;
          update = function () {
            if ($stateParams.lang === 'fr') {
              scope.langSwitch = 'en';
            } else {
              scope.langSwitch = 'fr';
            }
            return dataProvider.getMenu($stateParams.lang).then(function (res) {
              var wording;
              wording = res.data;
              return scope.routes = [
                {
                  label: wording.about,
                  name: 'home',
                  state: 'home({ lang : \'' + $stateParams.lang + '\' })'
                },
                {
                  label: wording.projects,
                  name: 'works',
                  state: 'works({ lang : \'' + $stateParams.lang + '\' })'
                },
                {
                  label: wording.manifesto,
                  name: 'ressources',
                  state: 'ressources.list({ lang : \'' + $stateParams.lang + '\' })'
                },
                {
                  label: wording.life,
                  name: 'life',
                  state: 'life({ lang : \'' + $stateParams.lang + '\' })'
                }
              ];
            });
          };
          update();
          scope.clickOnAbout = function (item) {
            if (item.name !== 'home') {
              return false;
            }
            setTimeout(function () {
              return $rootScope.$broadcast('home:lastLayout', true);
            }, 500);
          };
          scope.$on('$stateChangeSuccess', function (value) {
            update();
            return $rootScope.$broadcast('menu:close');
          });
          setSelected = function () {
            switch ($state.current.name) {
            case 'home':
              return scope.selected = $state.current.name;
            case 'works':
            case 'casesstudies':
            case 'projects':
              return scope.selected = 'works';
            case 'ressources.list':
            case 'ressources.details':
              return scope.selected = 'ressources';
            case 'life':
              return scope.selected = $state.current.name;
            case 'jobs.list':
            case 'jobs.details':
              return scope.selected = 'jobs';
            }
          };
          setSelected();
          $rootScope.$on('$stateChangeSuccess', function () {
            setSelected();
            return scope.isAbout = $state.current.name === 'home' ? true : false;
          });
          scope.open = function (e) {
            e.preventDefault();
            return $rootScope.$broadcast('menu:toogle');
          };
          scope.changeLang = function (e) {
            e.preventDefault();
            if ($stateParams.lang === 'en') {
              $stateParams.lang = 'fr';
              document.title = 'Dataveyes | Interactions Homme\u2014Donn\xe9es';
            } else {
              $stateParams.lang = 'en';
              document.title = 'Dataveyes | Human Data Interactions';
            }
            $state.go($state.current.name, $stateParams);
            $('body').removeClass('fr en').addClass($stateParams.lang);
          };
        }
      };
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').directive('gallery', function () {
    return {
      restrict: 'A',
      replace: false,
      controller: [
        '$scope',
        '$element',
        '$attrs',
        function ($scope, $element, $attrs) {
          $scope.large = false;
          this.getLarge = function () {
            return $scope.large;
          };
          this.setLarge = function (value) {
            return $scope.$apply(function () {
              return $scope.large = value;
            });
          };
        }
      ]
    };
  }).directive('galleryItem', function () {
    return {
      restrict: 'A',
      replace: false,
      require: '^gallery',
      link: function (scope, element, attributes, galleryController) {
        return element.on('click', function () {
          if (galleryController.getLarge()) {
            galleryController.setLarge(false);
            return $('.gallery-item').children('img').animate({
              'height': 288,
              'width': 512
            }, 400);
          } else {
            galleryController.setLarge(true);
            return setTimeout(function () {
              return $('.gallery-item').children('img').animate({
                'height': 576,
                'width': 1024
              }, 400);
            }, 600);
          }
        });
      }
    };
  });
}.call(this));
(function () {
  angular.module('DataveyesApp').directive('feature', [
    '$timeout',
    function ($timeout) {
      return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attributes) {
          var isMoving;
          isMoving = false;
          scope.onFeaturedEnter = function ($event) {
            var $element, $items, $otherElement;
            isMoving = true;
            $element = $($event.currentTarget);
            $items = $('.featured-item');
            $otherElement = $items.not($element);
            $element.animate({ 'width': '50%' }, 500);
            $otherElement.animate({ 'width': '25%' }, 500);
          };
          return scope.onFeaturedLeave = function ($event) {
            isMoving = false;
            $timeout(function () {
              var $items;
              if (!isMoving) {
                $items = $('.featured-item');
                return $items.animate({ 'width': '33.33%' }, 500);
              }
            }, 500);
          };
        }
      };
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').directive('vimeo', [
    '$sce',
    '$interval',
    '$stateParams',
    function ($sce, $interval, $stateParams) {
      return {
        restrict: 'A',
        replace: true,
        scope: { video: '=' },
        templateUrl: 'views/player.html',
        link: function (scope, element, attributes) {
          var url;
          url = scope.video.replace('vimeo.com', 'player.vimeo.com/video').replace('https:', '').replace('http:', '');
          scope.url = $sce.trustAsResourceUrl(url + '?player_id=player&badge=0&byline=0&portrait=0&title=0');
          scope.height = window.md.tablet() !== null ? 576 : attributes.height;
          scope.width = window.md.tablet() !== null ? 1024 : attributes.width;
          scope.isPlayable = true;
          scope.watchLabel = $stateParams.lang === 'fr' ? 'Voir la d\xe9mo' : 'Watch demo';
          return scope.playVideo = function ($event) {
            var player;
            $event.preventDefault();
            player = $f(document.getElementById('player'));
            player.api('play');
            $('.gallery, .video').addClass('is-playing');
            return scope.isPlayable = false;
          };
        }
      };
    }
  ]);
}.call(this));
(function () {
  angular.module('DataveyesApp').directive('team', [
    '$timeout',
    '$rootScope',
    function ($timeout, $rootScope) {
      return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attributes) {
          if (scope.$last) {
            return $timeout(function () {
              return $rootScope.$broadcast('team:last');
            });
          }
        }
      };
    }
  ]);
}.call(this));
(function () {
  if (window.dv == null) {
    window.DATAVEYES = {};
  }
  window.DATAVEYES.Component = function () {
    var Component, _get, _set;
    Component = function () {
      this.attributs = {};
      this.sceneWitdh = function () {
        var attrs;
        attrs = this.attributs;
        return attrs.width - attrs.margin.left - attrs.margin.right;
      };
      this.sceneHeight = function () {
        var attrs;
        attrs = this.attributs;
        return attrs.height - attrs.margin.top - attrs.margin.bottom;
      };
      return this;
    };
    'use strict';
    Component.prototype.attr = function (attribute, value, callback) {
      if (this.attributs === null) {
        throw new Error('CSJV-COMPONENT : Class have not \'attributs\' object.');
      }
      if (typeof value === 'undefined' || value === null) {
        return _get(this.attributs, attribute, callback);
      } else {
        _set(this.attributs, attribute, value, callback);
      }
      return this;
    };
    _set = function (obj, attribute, value, callback) {
      if (obj[attribute] !== null) {
        obj[attribute] = value;
        if (typeof callback !== 'undefined' && callback !== null) {
          callback(value);
        }
        return obj[attribute];
      } else {
        throw new Error('CSJV-COMPONENT : Attribute \'' + attribute + '\' cannot be set.');
      }
    };
    _get = function (obj, attribute, callback) {
      if (obj[attribute] !== null) {
        if (typeof callback !== 'undefined' && callback !== null) {
          callback();
        }
        return obj[attribute];
      } else {
        throw new Error('CSJV-COMPONENT : Attribute \'' + attribute + '\' cannot be get.');
      }
    };
    return Component;
  }();
}.call(this));
(function () {
  var __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
      for (var key in parent) {
        if (__hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, __indexOf = [].indexOf || function (item) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item)
          return i;
      }
      return -1;
    };
  if (window.DATAVEYES == null) {
    window.DATAVEYES = {};
  }
  window.DATAVEYES.Logo = function (_super) {
    var COS, PI, PI2, SIN, chooseFriend, circularPositon, drawPoints, getLinks, obj;
    __extends(Logo, _super);
    obj = null;
    function Logo(elem) {
      var canvas;
      window.focused = true;
      window.addEventListener('focus', function (event) {
        return window.focused = true;
      }, false);
      window.addEventListener('blur', function (event) {
        return window.focused = false;
      }, false);
      obj = this;
      this.attributs = {};
      this.attributs.elem = elem;
      this.attributs.data = [];
      this.attributs.width = window.innerWidth;
      this.attributs.height = window.innerHeight;
      this.attributs.remove = false;
      this.attributs.links = [];
      this.attributs.gradient = true;
      this.attributs.anim = true;
      this.attributs.nodeSize = 2;
      this.attributs.edgeSize = 1;
      this.attributs.iterate = 0;
      this.attributs.color = {
        'name': 'night',
        'start': '#052349',
        'end': '#fd575f',
        'nodes': '#052349'
      };
      this.attributs.image = {
        name: 'none',
        width: 0,
        height: 0
      };
      this.attributs.imageSize = 1;
      this.attributs.innerRadius = 0;
      this.attributs.innerRadiusAdd = 0;
      this.attributs.outterRadius = 400;
      this.attributs.outterRadiusAdd = 0;
      this.attributs.layout = 'forceLayout';
      this.attributs.lastColor = {
        sr: 255,
        sg: 255,
        sb: 255,
        er: 255,
        eg: 255,
        eb: 255
      };
      this.attributs.colorTween = {
        stop: function () {
        }
      };
      this.attributs.partialCircular = false;
      this.attributs.needToAnimateGrad = true;
      this.attributs.ratio = 1;
      this.attributs.partialCircularOpacity = {
        node: 1,
        links: 1
      };
      this.attributs.lastMaxPartial = 0;
      this.attributs.layerNeedUpdate = true;
      this.attributs.rangeTimers = null;
      this.attributs.partialRange = {
        max: 400,
        add: 0,
        count: 4,
        start: 0,
        end: 0,
        base: 20,
        addTimer: 400,
        comminTimer: 400,
        leavinTimer: 400,
        first: true,
        easing: false
      };
      this.attributs.utils = {};
      this.canvas = this.attributs.elem.selectAll('canvas.logo').data([{}]);
      this.canvas.enter().append('canvas').attr('class', 'logo');
      this.canvas.attr('width', this.attributs.width + 'px').attr('height', this.attributs.height + 'px');
      canvas = this.canvas.node();
      canvas.style.width = this.attributs.width + 'px';
      canvas.style.height = this.attributs.height + 'px';
      this.context = this.canvas.node().getContext('2d');
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.animate();
      return;
    }
    Logo.prototype.update = function () {
      var addFn, canvas, color, controls, count, instance, item, _i, _len, _ref, _this = this;
      this.attributs.links = [];
      this.attributs.ratio = getPixelRatio(this.context);
      this.attributs.layerUpdated = true;
      instance = this;
      this.canvas.attr('width', this.attributs.width + 'px').attr('height', this.attributs.height + 'px');
      canvas = this.canvas.node();
      canvas.style.width = this.attributs.width + 'px';
      canvas.style.height = this.attributs.height + 'px';
      clearInterval(this.attributs.rangeTimers);
      clearTimeout(this.attributs.rangeTimers);
      if (instance.force != null) {
        this.attributs.links = instance.force.links();
        instance.force.stop();
        delete instance.force;
      }
      if (this.attributs.layout === 'dancingLayout') {
        TWEEN.removeAll();
        controls = {
          overlapsTask: true,
          followingTask: false
        };
        this.attributs.links = getLinks(this.attributs.data, controls);
        this.context.gradient = 'white';
        _ref = this.attributs.data;
        for (count = _i = 0, _len = _ref.length; _i < _len; count = ++_i) {
          item = _ref[count];
          item.index = count;
          item.friend = chooseFriend(item, obj.attributs.data);
          item.x = Math.random() * obj.attributs.width;
          item.y = Math.random() * obj.attributs.height;
          item.gradient = null;
        }
      } else {
        color = this.attributs.lastColor;
        this.attributs.colorTween = new TWEEN.Tween(color).to({
          sr: 244,
          sg: 195,
          sb: 30,
          er: 0,
          eg: 189,
          eb: 204
        }, 1000).onUpdate(function () {
          _this.context.gradient = _this.context.createLinearGradient(0, instance.attributs.height / 2, instance.attributs.width, instance.attributs.height / 2);
          _this.context.gradient.addColorStop(0, 'rgb(' + Math.round(color.sr) + ', ' + Math.round(color.sg) + ', ' + Math.round(color.sb) + ')');
          _this.context.gradient.addColorStop(1, 'rgb(' + Math.round(color.er) + ', ' + Math.round(color.eg) + ', ' + Math.round(color.eb) + ')');
        }).start();
      }
      this.attributs.partialCircular = false;
      if (this.attributs.layout === 'partialCircular') {
        TWEEN.removeAll();
        this.attributs.layerNeedUpdate = true;
        if (!this.attributs.partialRange.reused) {
          count = this.attributs.partialRange.base;
        } else {
          count = this.attributs.partialRange.count;
        }
        this.attributs.rangeTimers = null;
        if (this.attributs.rangeTimers == null) {
          addFn = function () {
            if (_this.attributs.partialRange.addTimer !== 0) {
              _this.attributs.rangeTimers = setTimeout(function () {
                if (window.focused) {
                  _this.attributs.partialRange.count = count;
                  _this.attributs.partialCircular = false;
                  _this[obj.attributs.layout](_this, _this.attributs.data, _this.attributs.links, 1000 * 60 * 60 * count, count);
                  count += _this.attributs.partialRange.add;
                  _this.attributs.lastMaxPartial = _this.attributs.partialRange.max;
                }
                return addFn();
              }, _this.attributs.partialRange.addTimer);
            }
          };
          setTimeout(function () {
            return addFn();
          }, 20);
        }
      }
      return this;
    };
    Logo.prototype.animate = function () {
      if (window.focused) {
        if (obj.attributs.anim) {
          obj.context.clearRect(0, 0, obj.attributs.width, obj.attributs.height);
          obj[obj.attributs.layout](obj, obj.attributs.data, obj.attributs.links);
        }
        TWEEN.update();
      }
      if (!obj.attributs.remove) {
        requestAnimFrame(obj.animate);
      }
    };
    chooseFriend = function (obj, array) {
      var friend, friendIndex, reassign;
      friendIndex = Math.floor(Math.random() * (array.length - 1));
      friend = array[friendIndex];
      reassign = function (obj, opposite, index) {
        if (opposite.id === obj.id) {
          if (index + 1 < array.length - 1) {
            return opposite = friendIndex + 1;
          } else if (index - 1 > 0) {
            return opposite = friendIndex - 1;
          } else {
            index = Math.floor(Math.random() * (array.length - 1));
            opposite = array[index];
            return reassign(obj, opposite, index);
          }
        }
      };
      if (array.length > 2) {
        reassign(obj, friend, friendIndex);
      }
      return friend;
    };
    drawPoints = function (instance, points) {
      var point, _i, _len;
      for (_i = 0, _len = points.length; _i < _len; _i++) {
        point = points[_i];
        instance.context.beginPath();
        instance.context.arc(point.x, point.y, instance.attributs.nodeSize, 0, PI2, false);
        instance.context.fillStyle = 'white';
        instance.context.fill();
      }
    };
    Logo.prototype.dancingLayout = function (instance, points) {
      var center, coef, cx, cy, d, data, floor, friend, indice, item, offset, opposite, others, px, py, ratio, size, _i, _j, _len, _len1;
      center = {
        x: instance.attributs.width / 2,
        y: instance.attributs.height / 2
      };
      ratio = this.attributs.ratio;
      size = instance.attributs.nodeSize / ratio;
      offset = md.tablet() != null ? 200 : 0;
      data = points.slice(0, points.length - offset);
      coef = 0.7;
      friend = 0.06 / 2 * coef * (md.tablet() ? 2 : 1);
      floor = 0.05 / 7 * coef * (md.tablet() ? 10 : 1);
      others = 0.1 / 5000 * coef;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        item = data[_i];
        cx = item.x - center.x;
        cy = item.y - center.y;
        item.x -= cx * floor;
        item.y -= cy * floor;
        for (_j = 0, _len1 = points.length; _j < _len1; _j++) {
          opposite = points[_j];
          if (item.id !== opposite.id) {
            indice = 4.5;
            px = item.x - opposite.x;
            py = item.y - opposite.y;
            d = Math.sqrt(px * px + py * py);
            if (d < 10) {
              indice = 3000;
            } else if (d > 300) {
              indice = 0.5;
            }
            item.x -= (opposite.x - item.x) * (others * indice);
            item.y -= (opposite.y - item.y) * (others * indice);
          }
        }
        item.x += (item.friend.x - item.x) * friend;
        item.y += (item.friend.y - item.y) * friend;
        if (Math.floor(Math.random() * 15000) === 13) {
          item.friend = chooseFriend(item, points);
        }
        item.x = item.x;
        item.y = item.y;
        instance.context.beginPath();
        instance.context.arc(item.x / ratio, item.y / ratio, size, 0, PI2, false);
        instance.context.fillStyle = instance.context.gradient;
        instance.context.fill();
      }
    };
    Logo.prototype.forceLayout = function (instance, points) {
      var anim, controls, tick;
      if (!points.length) {
        return false;
      }
      points = points.slice(0, points.length - 200);
      controls = {
        overlapsTask: true,
        followingTask: false
      };
      tick = function () {
        var point, ratio, size, xmax, xmin, ymax, ymin, _i, _len;
        ratio = instance.attributs.ratio;
        size = instance.attributs.nodeSize / ratio;
        xmax = instance.attributs.width + 10;
        xmin = -10;
        ymax = instance.attributs.height + 10;
        ymin = -10;
        for (_i = 0, _len = points.length; _i < _len; _i++) {
          point = points[_i];
          if (point.x < xmax && point.x > xmin && point.y < ymax && point.y > ymin) {
            instance.context.beginPath();
            instance.context.arc(point.x / ratio, point.y / ratio, size, 0, PI2, false);
            instance.context.fillStyle = instance.context.gradient;
            instance.context.fill();
          }
        }
      };
      if (instance.force == null) {
        anim = { friction: -0.015 };
        instance.force = d3.layout.force().size([
          instance.attributs.width,
          instance.attributs.height
        ]).charge(-250).nodes(points).links(getLinks(points, controls)).linkDistance(150).linkStrength(0.1).friction(anim.friction).start();
        new TWEEN.Tween(anim).easing(TWEEN.Easing.Exponential.InOut).delay(3000).to({ friction: 1.2 }, 600).onUpdate(function () {
          return instance.force.friction(anim.friction);
        }).onComplete(function () {
          return instance.force.friction(0.9);
        }).start();
      } else {
        instance.force.start();
        tick();
      }
    };
    getLinks = function (data, controls) {
      var item, link, links, _i, _j, _len, _len1;
      links = linksTool(data, controls);
      for (_i = 0, _len = links.length; _i < _len; _i++) {
        link = links[_i];
        for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
          item = data[_j];
          if (item.id === link.source) {
            link.source = item;
          }
          if (item.id === link.target) {
            link.target = item;
          }
        }
      }
      return links;
    };
    Logo.prototype.forceLayoutLinked = function (instance, points) {
      var anim, color, colorDot, controls, count, link, links, t, tick, tween, _i, _len, _this = this;
      controls = {
        overlapsTask: true,
        followingTask: false
      };
      if (!points.length) {
        return false;
      }
      points = points.slice(0, points.length - 200);
      tick = function () {
        var center, link, point, ratio, size, xmax, xmin, ymax, ymin, _i, _j, _len, _len1, _ref;
        ratio = instance.attributs.ratio;
        size = instance.attributs.nodeSize / ratio;
        xmax = instance.attributs.width + 10;
        xmin = -10;
        ymax = instance.attributs.height + 10;
        ymin = -10;
        center = {
          x: instance.attributs.width / 2,
          y: instance.attributs.height / 2
        };
        _ref = instance.force.links();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          link = _ref[_i];
          if (link.source.x < xmax && link.source.x > xmin && link.source.y < ymax && link.source.y > ymin) {
            instance.context.beginPath();
            instance.context.moveTo(link.source.x / ratio, link.source.y / ratio);
            instance.context.lineTo(link.target.x / ratio, link.target.y / ratio);
            instance.context.strokeStyle = link.gradient;
            instance.context.stroke();
          }
        }
        for (_j = 0, _len1 = points.length; _j < _len1; _j++) {
          point = points[_j];
          if (point.x < xmax && point.x > xmin && point.y < ymax && point.y > ymin) {
            instance.context.beginPath();
            instance.context.arc(point.x / ratio, point.y / ratio, size, 0, PI2, false);
            instance.context.fillStyle = instance.context.gradient;
            instance.context.fill();
          }
        }
      };
      if (instance.force == null) {
        anim = { linkStrength: 0 };
        links = getLinks(points, controls);
        instance.force = d3.layout.force().size([
          instance.attributs.width,
          instance.attributs.height
        ]).charge(-150).gravity(0.05).nodes(points).links(links).linkStrength(anim.linkStrength).linkDistance(10).friction(0.9).start();
        new TWEEN.Tween(anim).easing(TWEEN.Easing.Exponential.InOut).delay(1000).to({ linkStrength: 0.1 }, 2325).onUpdate(function () {
          return instance.force.linkStrength(anim.linkStrength);
        }).start();
        color = _.clone(this.attributs.lastColor);
        count = 0;
        tween = function (link, countD) {
          new TWEEN.Tween(link).delay(500 + countD * 5).easing(TWEEN.Easing.Exponential.InOut).to({ alpha: 1 }, 2000).onUpdate(function () {
            link.gradient = instance.context.createLinearGradient(0, instance.attributs.height / 2, instance.attributs.width, instance.attributs.height / 2);
            link.gradient.addColorStop(0, 'rgba(' + Math.round(color.sr) + ', ' + Math.round(color.sg) + ', ' + Math.round(color.sb) + ', ' + link.alpha + ')');
            return link.gradient.addColorStop(1, 'rgba(' + Math.round(color.er) + ', ' + Math.round(color.eg) + ', ' + Math.round(color.eb) + ', ' + link.alpha + ')');
          }).start();
        };
        for (t = _i = 0, _len = links.length; _i < _len; t = ++_i) {
          link = links[t];
          link.alpha = 0;
          link.gradient = instance.context.createLinearGradient(0, instance.attributs.height / 2, instance.attributs.width, instance.attributs.height / 2);
          link.gradient.addColorStop(0, 'rgba(' + Math.round(color.sr) + ', ' + Math.round(color.sg) + ', ' + Math.round(color.sb) + ', ' + link.alpha + ')');
          link.gradient.addColorStop(1, 'rgba(' + Math.round(color.er) + ', ' + Math.round(color.eg) + ', ' + Math.round(color.eb) + ', ' + link.alpha + ')');
          tween(link, count);
          count += 1;
        }
        colorDot = _.clone(this.attributs.lastColor);
        this.attributs.colorTween = new TWEEN.Tween(colorDot).to({
          sr: 255,
          sg: 255,
          sb: 255,
          er: 255,
          eg: 255,
          eb: 255
        }, 1000).delay(3000).onUpdate(function () {
          _this.context.gradient = _this.context.createLinearGradient(0, instance.attributs.height / 2, instance.attributs.width, instance.attributs.height / 2);
          _this.context.gradient.addColorStop(0, 'rgb(' + Math.round(colorDot.sr) + ', ' + Math.round(colorDot.sg) + ', ' + Math.round(colorDot.sb) + ')');
          _this.context.gradient.addColorStop(1, 'rgb(' + Math.round(colorDot.er) + ', ' + Math.round(colorDot.eg) + ', ' + Math.round(colorDot.eb) + ')');
        }).start();
      } else {
        instance.force.start();
        tick();
      }
    };
    Logo.prototype.partialCircular = function (instance, points, links, range, number) {
      var center, color, count, diff, end, gradient, link, point, ratio, settings, size, start, xmax, xmin, ymax, ymin, _base, _i, _j, _len, _len1, _ref;
      if (links == null) {
        links = [];
      }
      if (range == null) {
        range = 1000 * 60 * 60 * 48;
      }
      if (number == null) {
        number = this.attributs.partialRange.base;
      }
      if (!this.attributs.partialCircular) {
        if (this.attributs.partialRange.start === 0) {
          this.attributs.partialRange.start = points.length - 1;
        }
        if (this.attributs.partialRange.end === 0) {
          this.attributs.partialRange.end = points.length - 1 - number;
        } else {
          this.attributs.partialRange.end -= this.attributs.partialRange.add;
        }
        diff = Math.abs(this.attributs.partialRange.start - this.attributs.partialRange.end);
        if (diff > this.attributs.partialRange.max) {
          this.attributs.partialRange.start += this.attributs.partialRange.max - diff;
          if (typeof (_base = this.attributs.partialRange).onLoop === 'function') {
            _base.onLoop();
          }
        } else {
          if (this.attributs.partialRange.add < 0) {
            this.attributs.partialRange.start -= this.attributs.partialRange.add;
          }
        }
        if (this.attributs.partialRange.end <= 1 || this.attributs.partialRange.start - this.attributs.partialRange.add >= points.length - 1) {
          this.attributs.partialRange.add *= -1;
        }
        if (points[this.attributs.partialRange.start] == null) {
          this.attributs.partialRange.start = points.length - 1;
          this.attributs.partialRange.add = 0;
        }
        start = new Date(points[this.attributs.partialRange.start].start);
        end = new Date(start.getTime() - range);
        end = new Date(points[this.attributs.partialRange.end].start);
        settings = {
          innerRadius: this.attributs.innerRadius,
          innerRadiusAdd: this.attributs.innerRadiusAdd,
          outterRadius: this.attributs.outterRadius,
          outterRadiusAdd: this.attributs.outterRadiusAdd,
          data: points,
          links: links,
          range: {
            start: start,
            end: end
          }
        };
        this.animationComplete = true;
        this.attributs.needToAnimateGrad = false;
        circularPositon(this, settings);
        this.attributs.partialCircular = true;
      } else {
        center = {
          x: instance.attributs.width / 2,
          y: instance.attributs.height / 2
        };
        ratio = instance.attributs.ratio;
        size = instance.attributs.nodeSize / ratio;
        xmax = instance.attributs.width + 10;
        xmin = -10;
        ymax = instance.attributs.height + 10;
        ymin = -10;
        if (instance.attributs.innerRadius < 0) {
          instance.attributs.innerRadius = 0;
        }
        _ref = instance.attributs.links;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          link = _ref[_i];
          if (link.source.x < xmax && link.source.x > xmin && link.source.y < ymax && link.source.y > ymin) {
            color = _.clone(instance.attributs.lastColor);
            gradient = instance.context.createRadialGradient(center.x, center.y, instance.attributs.innerRadius, center.x, center.y, instance.attributs.outterRadius);
            gradient.addColorStop(0, 'rgba(' + Math.round(color.sr) + ', ' + Math.round(color.sg) + ', ' + Math.round(color.sb) + ', ' + link.alpha + ')');
            gradient.addColorStop(1, 'rgba(' + Math.round(color.er) + ', ' + Math.round(color.eg) + ', ' + Math.round(color.eb) + ', ' + link.alpha + ')');
            instance.context.strokeStyle = gradient;
            instance.context.beginPath();
            instance.context.moveTo(link.source.x / ratio, link.source.y / ratio);
            instance.context.lineTo(link.target.x / ratio, link.target.y / ratio);
            instance.context.stroke();
          }
        }
        for (count = _j = 0, _len1 = points.length; _j < _len1; count = ++_j) {
          point = points[count];
          if (point.x < xmax && point.x > xmin && point.y < ymax && point.y > ymin) {
            instance.context.beginPath();
            instance.context.arc(point.x / ratio, point.y / ratio, size, 0, PI2, false);
            instance.context.fillStyle = 'rgba(255,255,255,' + point.alpha + ')';
            instance.context.fill();
          }
        }
      }
      return this;
    };
    circularPositon = function (instance, settings) {
      var add, animationCount, center, color, controls, count, cx, cy, data, dataID, date, day, duration, durationAlpha, end, i, item, key, last, link, linkID, links, middle, number, point, points, scope, start, step, timeScale, tw, tween, x, y, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
      data = [];
      points = settings.data;
      start = settings.range.start;
      end = settings.range.end;
      for (_i = 0, _len = points.length; _i < _len; _i++) {
        point = points[_i];
        date = new Date(point.start);
        if (date < start && date > end) {
          data.push(point);
        }
      }
      dataID = function () {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
          item = data[_j];
          _results.push(item.id);
        }
        return _results;
      }();
      number = data.length;
      links = [];
      controls = {
        overlapsTask: false,
        followingTask: true,
        followingLimit: 48
      };
      center = {
        x: instance.attributs.width / 2,
        y: instance.attributs.height / 2
      };
      instance.attributs.links = getLinks(data, controls);
      linkID = [];
      _ref = instance.attributs.links;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        link = _ref[_j];
        link.alpha = 0;
        link.animating = false;
        link.source.link = link;
        link.target.link = link;
        linkID[link.source.id] = link;
        linkID[link.target.id] = link;
      }
      color = _.clone(instance.attributs.lastColor);
      instance.attributs.colorTween = new TWEEN.Tween(color).to({
        sr: 244,
        sg: 195,
        sb: 30,
        er: 0,
        eg: 189,
        eb: 204,
        alpha: 1
      }, 500).delay(1000).onUpdate(function () {
        instance.context.gradient = instance.context.createRadialGradient(center.x, center.y, instance.attributs.innerRadius, center.x, center.y, instance.attributs.outterRadius);
        instance.context.gradient.addColorStop(0, 'rgba(' + Math.round(color.sr) + ', ' + Math.round(color.sg) + ', ' + Math.round(color.sb) + ', ' + color.alpha + ')');
        instance.context.gradient.addColorStop(1, 'rgba(' + Math.round(color.er) + ', ' + Math.round(color.eg) + ', ' + Math.round(color.eb) + ', ' + color.alpha + ')');
      }).start();
      instance.attributs.users = getAll(_.uniq(data, function (d) {
        return d.user;
      }), 'user').sort();
      instance.attributs.userScale = d3.scale.linear().domain([
        0,
        instance.attributs.users.length - 1
      ]).range([
        instance.attributs.innerRadius,
        instance.attributs.outterRadius
      ]);
      instance.attributs.projectsGroups = _.groupBy(data, function (d) {
        return Math.round(new Date(d.start).getMinutes() / 10) + '-' + new Date(d.start).getHours() + '-' + new Date(d.start).getDate() + '-' + new Date(d.start).getMonth();
      });
      instance.attributs.daysScope = [];
      instance.attributs.angles = [];
      add = 90;
      _ref1 = instance.attributs.projectsGroups;
      for (key in _ref1) {
        day = _ref1[key];
        scope = d3.extent(day, function (d) {
          return new Date(d.start);
        });
        instance.attributs.daysScope = instance.attributs.daysScope.concat(scope);
      }
      instance.attributs.daysScope.reverse();
      step = 360 / (instance.attributs.daysScope.length - 1);
      for (i = _k = 0, _ref2 = 360 / step; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
        instance.attributs.angles = instance.attributs.angles.concat([(i * step + add) * 0.0174532925]);
      }
      timeScale = d3.scale.linear().domain(instance.attributs.daysScope).range(instance.attributs.angles);
      center = {
        x: instance.attributs.width / 2,
        y: instance.attributs.height / 2
      };
      animationCount = 0;
      for (count = _l = 0, _len2 = points.length; _l < _len2; count = ++_l) {
        point = points[count];
        if (!(_ref3 = point.id, __indexOf.call(dataID, _ref3) >= 0)) {
          duration = instance.attributs.partialRange.leavinTimer;
          durationAlpha = duration - 100 > 0 ? duration - 100 : duration;
          if (point.placed == null) {
            point.alpha = 1;
            cx = point.x + (center.x - point.x) * -1 * 5;
            cy = point.y + (center.y - point.y) * -1 * 5;
            point.placed = false;
            tween = function (item) {
              item.tweenning = true;
              new TWEEN.Tween(item).easing(TWEEN.Easing.Exponential.InOut).to({
                x: cx,
                y: cy
              }, duration).onComplete(function () {
                var middle;
                middle = (instance.attributs.outterRadius - instance.attributs.innerRadius) / 2;
                item.x = center.x + COS(97 * 0.0174532925) * instance.attributs.userScale(instance.attributs.users.indexOf(item.user));
                item.y = center.y - SIN(97 * 0.0174532925) * instance.attributs.userScale(instance.attributs.users.indexOf(item.user));
                item.placed = false;
                return item.tweenning = false;
              }).start();
              new TWEEN.Tween(item).to({ alpha: 0 }, durationAlpha).start();
            };
            tween(point);
          }
          if (point.placed) {
            cx = center.x + COS(83 * 0.0174532925) * instance.attributs.userScale(instance.attributs.users.indexOf(point.user));
            cy = center.y - SIN(83 * 0.0174532925) * instance.attributs.userScale(instance.attributs.users.indexOf(point.user));
            tween = function (item) {
              item.tweenning = true;
              new TWEEN.Tween(item).to({
                x: cx,
                y: cy
              }, duration).onComplete(function () {
                var middle;
                middle = (instance.attributs.outterRadius - instance.attributs.innerRadius) / 2;
                item.x = center.x + COS(97 * 0.0174532925) * instance.attributs.userScale(instance.attributs.users.indexOf(item.user));
                item.y = center.y - SIN(97 * 0.0174532925) * instance.attributs.userScale(instance.attributs.users.indexOf(item.user));
                item.placed = false;
                return item.tweenning = false;
              }).start();
              new TWEEN.Tween(item).to({ alpha: 0 }, durationAlpha).start();
            };
            tween(point);
          } else if (!point.tweenning) {
            point.placed = false;
            tween = function (item) {
              cx = point.x + (center.x - point.x) * -1 * 5;
              cy = point.y + (center.y - point.y) * -1 * 5;
              new TWEEN.Tween(item).to({
                x: cx,
                y: cy,
                alpha: 0
              }, durationAlpha).start();
            };
            tween(point);
            point.alpha = 0;
          }
        } else {
          point.rad = timeScale(new Date(point.start));
          point.secondRad = point.rad;
          point.secondRadius = 0;
          last = point;
          point.animationComplete = false;
          duration = instance.attributs.partialRange.comminTimer;
          point.alpha = 1;
          if (!point.placed && !instance.attributs.layerNeedUpdate) {
            middle = (instance.attributs.outterRadius - instance.attributs.innerRadius) / 2;
            point.x = center.x + COS(97 * 0.0174532925) * instance.attributs.userScale(instance.attributs.users.indexOf(point.user));
            point.y = center.y - SIN(97 * 0.0174532925) * instance.attributs.userScale(instance.attributs.users.indexOf(point.user));
          }
          if (linkID[point.id] != null) {
            link = linkID[point.id];
            item.link = link;
            if (!point.placed) {
              link.alpha = 0;
              if (!link.animating) {
                link.animating = true;
                new TWEEN.Tween(link).to({ alpha: 1 }, duration).onComplete(function () {
                  return link.animating = false;
                }).start();
              }
            } else {
              link.alpha = 1;
            }
          }
          x = center.x + COS(point.rad) * instance.attributs.userScale(instance.attributs.users.indexOf(point.user));
          y = center.y - SIN(point.rad) * instance.attributs.userScale(instance.attributs.users.indexOf(point.user));
          if (point.x !== x || point.y !== y) {
            tw = new TWEEN.Tween(point);
            if (instance.attributs.partialRange.easing) {
              tw.easing(TWEEN.Easing.Exponential.InOut);
            }
            tw.to({
              x: x,
              y: y,
              alpha: 1
            }, duration).start();
          }
          point.placed = true;
        }
      }
      instance.attributs.layerNeedUpdate = false;
    };
    Logo.prototype.destroy = function () {
      TWEEN.removeAll();
      clearInterval(this.attributs.rangeTimers);
      clearTimeout(this.attributs.rangeTimers);
      this.attributs.remove = true;
      return this;
    };
    Logo.prototype.resize = function () {
      obj.attributs.width = window.innerWidth;
      obj.attributs.height = window.innerHeight;
      obj.canvas.attr('width', obj.attributs.width).attr('height', obj.attributs.height);
      obj.attributs.ratio = getPixelRatio(obj.context);
      return this;
    };
    Logo.prototype.team = function (user) {
      var alpha, defaultAlpha, instance, item, link, tween, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      instance = this;
      this.attributs.anim = true;
      defaultAlpha = 0.05;
      TWEEN.removeAll();
      tween = function (obj, alpha) {
        new TWEEN.Tween(obj).to({ alpha: alpha }, 500).onComplete(function () {
          return instance.attributs.anim = false;
        }).start();
      };
      _ref = this.attributs.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        alpha = user != null ? defaultAlpha : 1;
        if (item.user === user) {
          alpha = 1;
        }
        if (((_ref1 = item.link) != null ? _ref1.target.user : void 0) === user) {
          alpha = 0.5;
        }
        tween(item, alpha);
      }
      _ref2 = this.attributs.links;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        link = _ref2[_j];
        alpha = user != null ? defaultAlpha : 1;
        if (link.source.user === user || link.target.user === user) {
          alpha = 1;
        }
        tween(link, alpha);
      }
    };
    PI = Math.PI;
    PI2 = PI * 2;
    COS = Math.cos;
    SIN = Math.sin;
    return Logo;
  }(window.DATAVEYES.Component);
}.call(this));
(function () {
  var __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
      for (var key in parent) {
        if (__hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    };
  if (window.DATAVEYES == null) {
    window.DATAVEYES = {};
  }
  window.DATAVEYES.Loader = function (_super) {
    var CIRC, QUART;
    __extends(Loader, _super);
    function Loader(elem) {
      var lineWidth;
      lineWidth = 4;
      this.attributs = {};
      this.attributs.width = 47 + lineWidth * 3 - 2.8;
      this.attributs.height = 47 + lineWidth * 3 - 2.8;
      this.canvas = elem.node();
      elem.attr('width', '' + this.attributs.width + 'px').attr('height', '' + this.attributs.height + 'px');
      this.canvas.style.width = this.attributs.width;
      this.canvas.style.height = this.attributs.height;
      this.context = this.canvas.getContext('2d');
      this.context.strokeStyle = '#00bccb';
      this.context.lineCap = 'square';
      this.context.lineWidth = lineWidth;
      return this;
    }
    Loader.prototype.update = function (percent, alpha) {
      var center, end, radius, start;
      if (alpha == null) {
        alpha = 1;
      }
      center = {
        x: this.attributs.width / 2,
        y: this.attributs.height / 2
      };
      start = -QUART;
      end = CIRC * percent - QUART;
      radius = this.attributs.width / 2 - this.context.lineWidth;
      this.context.clearRect(0, 0, this.attributs.width, this.attributs.height);
      this.context.beginPath();
      this.context.arc(center.x, center.y, radius, start, end, false);
      this.context.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')';
      this.context.stroke();
      return this;
    };
    CIRC = Math.PI * 2;
    QUART = Math.PI / 2;
    return Loader;
  }(window.DATAVEYES.Component);
}.call(this));
(function () {
  var links, msToHour;
  msToHour = function (ms) {
    return Math.round(ms / 1000 / 60 / 60);
  };
  links = function (data, controls) {
    var count, currentTime, delta, exist, hash, index, inverseHash, key, last, lastObj, lastTime, link, opposite, oppositeHash, oppositeInverseHash, oppositeScope, project, scope, task, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _links, _m, _ref, _ref1;
    links = [];
    data.sort(function (a, b) {
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    });
    if (controls.overlapsTask) {
      _ref = _.groupBy(data, 'project');
      for (key in _ref) {
        project = _ref[key];
        project.sort(function (a, b) {
          return new Date(a.start).getTime() - new Date(b.start).getTime();
        });
        for (_i = 0, _len = project.length; _i < _len; _i++) {
          task = project[_i];
          scope = [
            new Date(task.start).getTime(),
            new Date(task.end).getTime()
          ];
          for (_j = 0, _len1 = project.length; _j < _len1; _j++) {
            opposite = project[_j];
            if (task.id !== opposite.id) {
              oppositeScope = [
                new Date(opposite.start).getTime(),
                new Date(opposite.end).getTime()
              ];
              if (scope[0] <= oppositeScope[0] && oppositeScope[0] <= scope[1]) {
                links.push({
                  source: task.id,
                  target: opposite.id
                });
              }
            }
          }
        }
      }
    }
    if (controls.followingTask) {
      count = 0;
      _ref1 = _.groupBy(data, 'project');
      for (key in _ref1) {
        project = _ref1[key];
        project.sort(function (a, b) {
          return new Date(a.start).getTime() - new Date(b.start).getTime();
        });
        last = null;
        lastObj = null;
        for (_k = 0, _len2 = project.length; _k < _len2; _k++) {
          task = project[_k];
          if (last != null) {
            lastTime = new Date(lastObj.start).getTime();
            currentTime = new Date(task.start).getTime();
            delta = currentTime - lastTime;
            if (msToHour(delta) < controls.followingLimit) {
              link = {
                source: last,
                target: task.id,
                index: count
              };
              index = links.indexOf(link);
              if (index < 0) {
                links.push(link);
              }
            } else {
              count += 1;
            }
          }
          last = task.id;
          lastObj = task;
        }
        count += 1;
      }
    }
    _links = [];
    for (_l = 0, _len3 = links.length; _l < _len3; _l++) {
      link = links[_l];
      exist = false;
      hash = link.source + '-' + link.target;
      inverseHash = link.target + '-' + link.source;
      for (_m = 0, _len4 = _links.length; _m < _len4; _m++) {
        opposite = _links[_m];
        oppositeHash = opposite.source + '-' + opposite.target;
        oppositeInverseHash = opposite.target + '-' + opposite.source;
        if (hash === oppositeHash || hash === oppositeInverseHash || inverseHash === oppositeHash || inverseHash === oppositeInverseHash) {
          exist = true;
        }
      }
      if (!exist) {
        _links.push(link);
      }
    }
    return _links;
  };
  if (typeof window !== 'undefined' && window !== null) {
    window.linksTool = links;
  } else {
    module.exports = links;
  }
}.call(this));
(function () {
  angular.module('DataveyesApp').directive('loader', function () {
    return {
      restrict: 'A',
      scope: { ngSrc: '@' },
      link: function (scope, element, attrs) {
        var $imgContainer;
        $imgContainer = element.parent();
        element.on('load', function () {
          return $imgContainer.addClass('loaded');
        });
        return scope.$watch('ngSrc', function () {
          return $imgContainer.removeClass('loaded');
        });
      }
    };
  });
}.call(this));
(function () {
  angular.module('DataveyesApp').directive('dvFilter', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var project;
        project = scope.project;
        return scope.$parent.$watch('tagFilter.tags', function (tag) {
          if (tag !== null) {
            if (project.tags.indexOf(tag) === -1) {
              return element.fadeOut(600);
            } else {
              return element.fadeIn(600);
            }
          } else {
            return element.fadeIn(400);
          }
        });
      }
    };
  });
}.call(this));
(function () {
  angular.module('DataveyesApp').directive('carousel', [
    '$timeout',
    function ($timeout) {
      return {
        restrict: 'A',
        replace: false,
        scope: { ngModel: '=' },
        templateUrl: 'views/carousel.html',
        link: function (scope, element, attributes) {
          var $slider, setMarge, setNavigation;
          scope.previousDisabled = false;
          scope.nextDisabled = false;
          $slider = $(element).find('ul');
          $timeout(function () {
            $(element).dragswipe({
              width: attributes.width,
              height: attributes.height,
              onMove: setNavigation
            });
            setMarge();
            return $(element).children('.navigation').children(':last').remove();
          });
          setMarge = function () {
            var $childrenLength;
            $childrenLength = $slider.children().length;
            return $slider.css('margin-left', window.innerWidth / 2 - parseInt(attributes.width) / 2 - 30 + 'px');
          };
          setNavigation = function () {
            return $timeout(function () {
              if ($slider.currentPage() === 0) {
                scope.previousDisabled = true;
              } else {
                scope.previousDisabled = false;
              }
              if ($slider.totalPages() - 1 === $slider.currentPage()) {
                return scope.nextDisabled = true;
              } else {
                return scope.nextDisabled = false;
              }
            });
          };
          scope.next = function ($event) {
            $event.preventDefault();
            if ($slider.totalPages() - 1 === $slider.currentPage()) {
              return;
            }
            return $slider.nextPage();
          };
          return scope.previous = function ($event) {
            $event.preventDefault();
            if ($slider.currentPage() === 0) {
              return;
            }
            return $slider.prevPage();
          };
        }
      };
    }
  ]);
}.call(this));