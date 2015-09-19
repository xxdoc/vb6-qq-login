  // //basic structure of those objects
  // var friend_base = {
  //   uin: 'QQ号',   //done
  //   flag: '未知意义',
  //   categories: '分组序号'  //done
  // };

  // var categorie_base = {
  //   index: '未知',
  //   sort: '未知',
  //   name: '分组的名字'
  // };

  // var info_base = {
  //   flag: '未知',
  //   face: '未知',
  //   nick: '昵称', //done
  //   uin: 'QQ号'
  // };

  // var markname_base = {
  //   uin: 'QQ号',
  //   markname: '备注姓名', //done
  //   type: '未知意义'
  // };

  // var vipinfo_base = {
  //   vip_level: 'vip等级', //done
  //   u: 'QQ号',
  //   is_vip: '是否VIP用户' //done
  // };
  function analyse_friends(dataJson) {
    data = eval("(function() { return " + dataJson + ";})();");
    //frend bare info
    var friends = data.result.friends;
    //some details
    var infos = data.result.info;
    //remark of friend's real name
    var marknames = data.result.marknames;
    //vip info
    var vipinfos = data.result.vipinfo;
    //categories info
    var categories = data.result.categories;
    var myfriends = {};
    var mycategories = {};

    for (var category_id in categories) {
      mycategories[categories[category_id].index] = categories[category_id]['name'];
    }

    for (var friend_id in friends) {
      var friend = friends[friend_id];
      myfriends[friend.uin] = {
        qq: friend.uin,
        category: mycategories[friend.categories]
      };
    }

    for (var info_id in infos) {
      var info = infos[info_id];
      myfriends[info.uin]['nickname'] = info.nick;
    }

    for (var markname_id in marknames) {
      var markname = marknames[markname_id];
      myfriends[markname.uin]['realname'] = markname.markname;
    }

    for (var vipinfo_id in vipinfos) {
      var vipinfo = vipinfos[vipinfo_id];
      myfriends[vipinfo.u]['is_vip'] = vipinfo.is_vip;
      myfriends[vipinfo.u]['vip_level'] = vipinfo.vip_level;
    }

    return myfriends;
  }