// @/utils/permission

/**

 * 创建重定向函数

 * @param {Object} redirect - 重定向对象

 * @param {string} redirect.name - 重定向的组件名称

 * @param {Array<any>} children - 子列表

 */
function createRedirectFn (redirect = {}, children = []) {

      // 避免缓存太大，只保留 children 的 name 和 permissions
    
      const permissionChildren = children.map(({ name = '', meta: { permissions = [] } = {} }) => ({ name, permissions }))
    
      return function (to) {
    
        // 这里一定不能在 return 的函数外面筛选，因为权限是异步获取的
    
        const hasPermissionChildren = permissionChildren.filter(item => includePermission(item.permissions))
    
        // 默认填写的重定向的 name
    
        const defaultName = redirect.name || ''
    
        // 如果默认重定向没有权限，则从 children 中选择第一个有权限的路由做重定向
    
        const firstPermissionName = (hasPermissionChildren[0] || { name: '' }).name
    
        // 判断是否需要修改默认的重定向
    
        const saveDefaultName = !!hasPermissionChildren.find(item => item.name === defaultName && defaultName)
    
        if (saveDefaultName) return { name: defaultName }
    
        else return firstPermissionName ? { name: firstPermissionName } : redirect
    
      }
    
    }