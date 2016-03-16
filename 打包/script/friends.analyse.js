  function analyse_friends(dataJson) {
    data = eval("(function() { return " + dataJson + ";})();");
    var friends = data.result.friends;
    var infos = data.result.info;
    var marknames = data.result.marknames;
    var vipinfos = data.result.vipinfo;
    var categories = data.result.categories;
    var myfriends = {};
    var mycategories = {};
    var keys = [];
    var myfriends_arr = [];

    for (var category_id in categories) {
      mycategories[categories[category_id].index] = categories[category_id]['name'];
    }

    for (var friend_id in friends) {
      var friend = friends[friend_id];
      myfriends[friend.uin] = {
        "QQ号": friend.uin,
        "分组": mycategories[friend.categories]
      };
    }

    for (var info_id in infos) {
      var info = infos[info_id];
      myfriends[info.uin]["昵称"] = info.nick;
    }

    for (var markname_id in marknames) {
      var markname = marknames[markname_id];
      myfriends[markname.uin]["备注名"] = markname.markname;
    }

    for (var vipinfo_id in vipinfos) {
      var vipinfo = vipinfos[vipinfo_id];
      myfriends[vipinfo.u]["是否VIP"] = vipinfo.is_vip;
      myfriends[vipinfo.u]["VIP等级"] = vipinfo.vip_level;
    }

    for (var key_id in myfriends) {
      myfriends_arr.push(myfriends[key_id]);
    }

    return {
      dataarr: myfriends_arr
    };
  }