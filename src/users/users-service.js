const UsersService = {
  getStudents(db) {
    return db
      .select('ru.id', 'ru.user_name', 'ru.full_name')
      .from('registered_user as ru')
      .join('user_role as ur', 'ur.id', 'ru.role_id_fk')
      .where('ur.role_name', '=', 'Student');
  },
};

module.exports = UsersService;
