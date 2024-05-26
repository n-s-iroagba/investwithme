export const getNewbies = async (req: Request, res: Response): Promise<Response> => {
    let responseData = []
    const referrals = await Referral.findAll({
      where: {
        amount: {
          [Op.gt]: 0,
        },
        settled: false
      },
    });
    const pendingPromos = await PendingPromo.findAll({
      where: {
        amount: {
          [Op.gt]: 0,
        },
        settled: false
      },
    });
    if (referrals.length) {
      responseData.push('referrals')
    }
    if (pendingPromos.length) {
      responseData.push('promos')
    }
    return res.status(200).json(responseData)
  }