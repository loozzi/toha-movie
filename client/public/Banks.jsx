import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RiDeleteBin5Line } from 'react-icons/ri';
import api from '../../api';
import Button from '../../components/widgets/Button';
import Loading from '../../components/widgets/Loading';
import Panel from '../../components/widgets/Panel';
import Table from '../../components/widgets/Table';

const Banks = () => {
  document.title = 'Quản lý bank cron';
  const [data, setData] = useState(undefined);

  const [dataCreate, setDataCreate] = useState({
    phone: '',
    email: '',
    type_name: '',
    password: '',
    token: '',
    status: 0,
    name: '',
  });

  const headers = [
    {
      label: 'Type',
      full: true,
    },
    { label: 'Phone', full: true },
    { label: 'Số dư', full: false },
    { label: 'Hành động', full: true },
    { label: 'Xóa', full: true },
  ];

  const loadData = () => {
    const fetch = new Promise(async (resolve, reject) => {
      try {
        const res = await api.cron.getAll();
        if (res.code === 200) {
          resolve(res.elements.data);
        } else {
          reject(res);
        }
      } catch (err) {
        reject(err);
      }
    });
    toast.promise(fetch, {
      loading: 'Loading...',
      success: 'OK',
      error: 'Error',
    });

    fetch.then((data) => setData(data));
  };

  const handleActiveBank = async (bank_id) => {
    const fetch = new Promise(async (resolve, reject) => {
      const res = await api.admin.activeBank({
        bank_id: bank_id,
      });

      if (res.code === 200) resolve(res);
      else reject(res);
      loadData();
    });

    toast.promise(fetch, {
      loading: 'Loading...',
      success: (data) => data.message,
      error: (data) => data.message,
    });
  };

  const handleDeactivateBank = async (bank_id) => {
    const fetch = new Promise(async (resolve, reject) => {
      const res = await api.admin.deactiveBank({
        bank_id: bank_id,
      });

      if (res.code === 200) resolve(res);
      else reject(res);
      loadData();
    });

    toast.promise(fetch, {
      loading: 'Loading...',
      success: (data) => data.message,
      error: (data) => data.message,
    });
  };

  const handleRemoveBank = async (bank_id) => {
    const fetch = new Promise(async (resolve, reject) => {
      const res = await api.admin.removeBank({
        bank_id: bank_id,
      });

      if (res.code === 200) resolve(res);
      else reject(res);
      loadData();
    });

    toast.promise(fetch, {
      loading: 'Loading...',
      success: (data) => data.message,
      error: (data) => data.message,
    });
  };

  const handleAddBank = async (e) => {
    e.preventDefault();
    const fetch = new Promise(async (resolve, reject) => {
      const res = await api.cron.add(dataCreate);
      if (res.code === 200) resolve(res);
      else reject(res);
      loadData();
    });
    toast.promise(fetch, {
      loading: 'Đang thêm',
      success: 'Thành công',
      error: (err) => err.message,
    });
  };

  const handleEditPayloadCreate = (payload) => {
    setDataCreate((prev) => ({ ...prev, ...payload }));
  };

  const Rows = (banks) =>
    banks.map((bank, index) => (
      <tr key={index} className="h-12 select-none odd:bg-gray-100">
        <td className="td-cell uppercase">{bank.type_name}</td>
        <td className="td-cell">{bank.phone}</td>
        <td className="td-cell hidden md:table-cell">
          {!!bank.balance ? bank.balance.toLocaleString('en-US') : 0}đ
        </td>
        <td
          className={'td-cell cursor-pointer'.concat(
            bank.status === 0 ? ' bg-green-100' : ' bg-purple-200'
          )}
          onClick={() =>
            bank.status === 0
              ? handleActiveBank(bank.bank_id)
              : handleDeactivateBank(bank.bank_id)
          }
        >
          {bank.status === 0 ? 'Tiếp tục' : 'Tạm Ngừng'}
        </td>
        <td
          className="td-cell cursor-pointer bg-orange-100"
          onClick={() => handleRemoveBank(bank.bank_id)}
        >
          <span className="flex justify-center items-center">
            <RiDeleteBin5Line />
          </span>
        </td>
      </tr>
    ));

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <main>
          <section>
            <Panel title="Danh sách tài khoản">
              <Table headers={headers}>{Rows(data)}</Table>
            </Panel>
          </section>
          <section>
            <Panel title="Thêm tài khoản">
              <form onSubmit={handleAddBank}>
                <div className="flex flex-col md:items-center items-start md:flex-row mb-2">
                  <label htmlFor="phone" className="w-40">
                    Phone number
                  </label>
                  <input
                    className="w-full md:flex-1 p-2 border border-third rounded-md"
                    type="text"
                    name="phone"
                    value={dataCreate.phone}
                    placeholder="Phone number..."
                    onChange={(e) =>
                      handleEditPayloadCreate({
                        phone: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col md:items-center items-start md:flex-row mb-2">
                  <label htmlFor="name" className="w-40">
                    Name
                  </label>
                  <input
                    className="w-full md:flex-1 p-2 border border-third rounded-md"
                    type="text"
                    name="name"
                    value={dataCreate.name}
                    placeholder="Name..."
                    onChange={(e) =>
                      handleEditPayloadCreate({
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col md:items-center items-start md:flex-row mb-2">
                  <label htmlFor="type_name" className="w-40">
                    Type
                  </label>
                  <input
                    className="w-full md:flex-1 p-2 border border-third rounded-md"
                    type="text"
                    name="type_name"
                    value={dataCreate.type_name}
                    placeholder="(Momo, ZaloPay...)"
                    onChange={(e) =>
                      handleEditPayloadCreate({
                        type_name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col md:items-center items-start md:flex-row mb-2">
                  <label htmlFor="password" className="w-40">
                    Password
                  </label>
                  <input
                    className="w-full md:flex-1 p-2 border border-third rounded-md"
                    type="text"
                    name="password"
                    value={dataCreate.password}
                    placeholder="Password..."
                    onChange={(e) =>
                      handleEditPayloadCreate({
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col md:items-center items-start md:flex-row mb-2">
                  <label htmlFor="token" className="w-40">
                    Token
                  </label>
                  <input
                    className="w-full md:flex-1 p-2 border border-third rounded-md"
                    type="text"
                    name="token"
                    value={dataCreate.token}
                    placeholder="Token..."
                    onChange={(e) =>
                      handleEditPayloadCreate({
                        token: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col md:items-center items-start md:flex-row mb-2">
                  <label className="w-40">Status</label>
                  <select
                    className="w-full md:flex-1 p-2 border bg-white border-third rounded-md select-none"
                    value={dataCreate.status}
                    onChange={(e) =>
                      handleEditPayloadCreate({ status: e.target.value })
                    }
                  >
                    <option value={1} className="select-none">
                      Đang chạy
                    </option>
                    <option value={0} className="select-none">
                      Tạm ngừng
                    </option>
                  </select>
                </div>
                <Button primary label="Thêm" />
              </form>
            </Panel>
          </section>
        </main>
      )}
    </>
  );
};

export default Banks;
