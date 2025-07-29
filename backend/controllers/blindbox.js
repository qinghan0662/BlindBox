const { BlindBox, Order, Comment, User } = require('../models');
const { Op } = require('sequelize');

// 创建盲盒
exports.createBlindBox = async (req, res) => {
  try {
    const blindBox = await BlindBox.create({ ...req.body, creatorId: req.user.id });
    res.status(201).json(blindBox);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// 获取所有盲盒选项（商城展示）
exports.getBlindBoxes = async (req, res) => {
  try {
    // 支持热销排序和数量限制
    const { sort, limit } = req.query;
    let order = [['id', 'DESC']];
    if (sort === 'hot') order = [['sales', 'DESC']];
    const boxes = await BlindBox.findAll({
      order,
      limit: limit ? parseInt(limit) : undefined,
      where: { status: 'active' }
    });
    res.json(boxes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 获取盲盒详情
exports.getBlindBoxById = async (req, res) => {
  try {
    const box = await BlindBox.findByPk(req.params.id);
    if (!box) return res.status(404).json({ message: '盲盒不存在' });

    // 查询评论
    const comments = await Comment.findAll({
      where: { blindBoxId: req.params.id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      ...box.toJSON(),
      comments
    });
  } catch (err) {
    console.error('getBlindBoxById error:', err);
    res.status(500).json({ message: err.message });
  }
};

// 编辑盲盒
exports.updateBlindBox = async (req, res) => {
  try {
    const box = await BlindBox.findByPk(req.params.id);
    if (!box) return res.status(404).json({ message: '盲盒不存在' });
    await box.update(req.body);
    res.json(box);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// 删除盲盒
exports.deleteBlindBox = async (req, res) => {
  try {
    const box = await BlindBox.findByPk(req.params.id);
    if (!box) return res.status(404).json({ message: '盲盒不存在' });
    await box.destroy();
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 搜索盲盒
exports.searchBlindBoxes = async (req, res) => {
  try {
    const { q } = req.query;
    const boxes = await BlindBox.findAll({
      where: {
        name: { [Op.like]: `%${q}%` },
        status: 'active'
      }
    });
    res.json(boxes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 抽取盲盒
exports.drawFromBlindBox = async (req, res) => {
  try {
    const userId = req.user.id;
    const blindBoxId = parseInt(req.params.id);
    if (!blindBoxId) return res.status(400).json({ message: '缺少盲盒ID' });

    // 不同盲盒的经典款和隐藏款配置
    const styleMap = {
      1: [
        { type: '经典款', name: '哈基米经典款', description: '哈基米猫咪造型', coverImage: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.0Slaw_VYcQ7Ku-TOgww7LAAAAA?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
        { type: '隐藏款', name: '哈基米隐藏款', description: '哈基米隐藏猫咪', coverImage: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.WlvBqkssoMwNntXXSTDU6gHaHa?w=216&h=216&c=7&r=0&o=5&dpr=1.3&pid=1.7https://tse4-mm.cn.bing.net/th/id/OIP-C.WlvBqkssoMwNntXXSTDU6gHaHa?w=216&h=216&c=7&r=0&o=5&dpr=1.3&pid=1.7' }
      ],
      8: [
        { type: '经典款', name: '狐狸经典款', description: '狡黠狐狸造型', coverImage: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.2AqH6B-ilJWVx9_0JFiIqgHaHa?w=182&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
        { type: '隐藏款', name: '狐狸隐藏款', description: '稀有隐藏狐狸', coverImage: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.SRO7o-7LZr24GnKaAiOPwAHaFv?w=250&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7' }
      ],
      9: [
        { type: '经典款', name: '小猪经典款', description: '萌萌小猪造型', coverImage: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.FGr_clSSBT9TEwpowqLkOgHaHa?w=217&h=216&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
        { type: '隐藏款', name: '小猪隐藏款', description: '稀有隐藏小猪', coverImage: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.p70Wj8vMiajwzLe4XnE8gQAAAA?w=219&h=219&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' }
      ],
      10: [
        { type: '经典款', name: '小鱼经典款', description: '趣味小鱼造型', coverImage: 'https://cn.bing.com/images/search?view=detailV2&ccid=dxQ%2fqVXb&id=A9C497BB0F3A5CFBD41ECC3403B886DABA39423E&thid=OIP.dxQ_qVXbSjzjcDFZ5UgGIgHaHa&mediaurl=https%3a%2f%2fcbu01.alicdn.com%2fimg%2fibank%2fO1CN013e7j4o1RPDg9EzERu_!!2211279202103-0-cib.jpg&cdnurl=https%3a%2f%2fts1.tc.mm.bing.net%2fth%2fid%2fR-C.77143fa955db4a3ce3703159e5480622%3frik%3dPkI5utqGuAM0zA%26pid%3dImgRaw%26r%3d0&exph=800&expw=800&q=%e9%b1%bc%e7%8e%a9%e5%81%b6&simid=607989902234054265&FORM=IRPRST&ck=873938FD78FB4771BD55160C2F811450&selectedIndex=5&itb=0' },
        { type: '隐藏款', name: '小鱼隐藏款', description: '稀有隐藏小鱼', coverImage: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.lc3tlV6I57z4_n4M38PhEQAAAA?w=187&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' }
      ],
      11: [
        { type: '经典款', name: '小熊经典款', description: '憨态可掬小熊', coverImage: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.a9zACBZyPTsoaRcK9MBtYQHaHa?w=186&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
        { type: '隐藏款', name: '小熊隐藏款', description: '稀有隐藏小熊', coverImage: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.F_50fT3l4PoEI_vD4uM-zAHaE7?w=290&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7' }
      ],
      12: [
        { type: '经典款', name: '鹿鹿经典款', description: '呆萌鹿鹿造型', coverImage: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.9DKzErqFLN2h13ukZieidAAAAA?w=211&h=211&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3https://tse1-mm.cn.bing.net/th/id/OIP-C.9DKzErqFLN2h13ukZieidAAAAA?w=211&h=211&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
        { type: '隐藏款', name: '鹿鹿隐藏款', description: '稀有隐藏鹿鹿', coverImage: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.uTlOXRHv3G--4M5RrnB04AHaF0?w=250&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7' }
      ],
      14: [
        { type: '经典款', name: '蟑螂经典款', description: '恶搞蟑螂造型', coverImage: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.pkD8qEvmvXQH88C3qAon4QAAAA?w=194&h=194&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
        { type: '隐藏款', name: '蟑螂隐藏款', description: '隐藏智慧蟑螂', coverImage: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.T-J5puV234Ne4I9TceKrngHaHa?w=169&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' }
      ]
    };

    // 默认经典款和隐藏款
    const styles = styleMap[blindBoxId] || [
      { type: '经典款', name: '默认经典款', description: '默认经典款描述', coverImage: 'https://xxx/default_classic.jpg' },
      { type: '隐藏款', name: '默认隐藏款', description: '默认隐藏款描述', coverImage: 'https://xxx/default_hidden.jpg' }
    ];

    // 隐藏款概率 10%，否则经典款
    const isHidden = Math.random() < 0.1;
    const candidates = styles.filter(s => s.type === (isHidden ? '隐藏款' : '经典款'));
    const result = candidates[Math.floor(Math.random() * candidates.length)];

    await Order.create({
      userId,
      blindBoxId,
      status: 'pending',
      resultType: result.type,
      resultName: result.name
    });

    await BlindBox.increment('sales', { by: 1, where: { id: blindBoxId } });

    const box = await BlindBox.findByPk(blindBoxId);

    res.json({
      message: '抽取成功',
      sales: box.sales,
      result // 返回抽中的款式详情
    });
  } catch (err) {
    res.status(500).json({ message: '抽取失败', error: err.message });
  }
};