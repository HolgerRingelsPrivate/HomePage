import i18n from './../../../singletons/i18n/I18n';

export function getRelationLabel(relationname, inOutSelect) {
  let uiLanguage = i18n.getLocaleInUse();
  let result = null;

  if (uiLanguage === 'en') {
    result = i18nLabel_en(relationname, inOutSelect);
    return result;
  }
  if (uiLanguage === 'de') {
    result = i18nLabel_de(relationname, inOutSelect);
    return result;
  }

  //undefined => return english
  result = i18nLabel_en(relationname, inOutSelect);
  return result;
}

function i18nLabel_en(relationname, inOutSelect) {
  if (inOutSelect === 'in') {
    if (relationname === 'cd_xxx_vinyl') {
      return 'CD with same content';
    }
    if (relationname === 'cd_xxx_mediaactor') {
      return 'Acting on CD ...';
    }
    if (relationname === 'mediaentry_xxx_mediaactor') {
      return 'Acting on Movie ...';
    }
  }

  if (inOutSelect === 'out') {
    if (relationname === 'cd_xxx_vinyl') {
      return 'Vinyl with same content';
    }
    if (relationname === 'cd_xxx_mediaactor') {
      return 'Actors';
    }
    if (relationname === 'mediaentry_xxx_mediaactor') {
      return 'Actors';
    }
  }

  return '? (relationname)';
}

function i18nLabel_de(relationname, inOutSelect) {
  if (inOutSelect === 'in') {
    if (relationname === 'cd_xxx_vinyl') {
      return 'CD gleichen Inhalts';
    }
    if (relationname === 'cd_xxx_mediaactor') {
      return 'Mitwirkung an CD(s) ...';
    }
    if (relationname === 'mediaentry_xxx_mediaactor') {
      return 'Mitwirkung an Film(en) ...';
    }
  }

  if (inOutSelect === 'out') {
    if (relationname === 'cd_xxx_vinyl') {
      return 'Vinyl gleichen Inhalts';
    }
    if (relationname === 'cd_xxx_mediaactor') {
      return 'Akteur(e)';
    }
    if (relationname === 'mediaentry_xxx_mediaactor') {
      return 'Akteur(e)';
    }
  }

  return '? (relationname)';
}
